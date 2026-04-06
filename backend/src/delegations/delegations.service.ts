import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDelegationDto } from './dto/create-delegation.dto';
import { UpdateDelegationDto } from './dto/update-delegation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delegation } from './delegations.schema';
import { QueryDelegationDto } from './dto/query-delegation.dto';
import { paginate } from '../common/utils/pagination.util';
import { User } from '../users/users.schema';
import { NotificationsService } from '../notifications/notifications.service';
import { Counter } from '../counters/counters.schema';

@Injectable()
export class DelegationsService {
  // Delegation module centralizes "act on behalf" rules for approval steps.
  // Approval module should call this service instead of duplicating date/type checks.
  private readonly MANAGER_MIN_LEVEL = 3;

  constructor(
    @InjectModel(Delegation.name)
    private readonly delegationModel: Model<Delegation>,
    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createDelegationDto: CreateDelegationDto) {
    this.validateCreateOrUpdate(createDelegationDto);
    await this.validateHierarchyDelegation(
      createDelegationDto.fromUserId,
      createDelegationDto.toUserId,
    );

    const createNewDelegation = new this.delegationModel({
      ...createDelegationDto,
      dgtDisplayId: await this.generateDisplayId(),
      startDate: new Date(createDelegationDto.startDate),
      endDate: new Date(createDelegationDto.endDate),
      specificTypeCode: createDelegationDto.applyToAll
        ? []
        : (createDelegationDto.specificTypeCode ?? []),
      isActive: createDelegationDto.isActive ?? true,
    });

    const created = await createNewDelegation.save();

    // Notify delegatee so they know they can approve on behalf of owner.
    await this.notificationsService.notifyDelegationReceived({
      recipientId: createDelegationDto.toUserId,
      delegationId: String(created._id),
      fromUserId: createDelegationDto.fromUserId,
    });

    return created;
  }

  findAll(queryDelegationDto: QueryDelegationDto) {
    const filter: Record<string, any> = {};

    if (queryDelegationDto.fromUserId) {
      filter.fromUserId = queryDelegationDto.fromUserId;
    }

    if (queryDelegationDto.toUserId) {
      filter.toUserId = queryDelegationDto.toUserId;
    }

    if (typeof queryDelegationDto.isActive === 'boolean') {
      filter.isActive = queryDelegationDto.isActive;
    }

    if (queryDelegationDto.atDate) {
      const atDate = new Date(queryDelegationDto.atDate);
      filter.startDate = { $lte: atDate };
      filter.endDate = { $gte: atDate };
    }

    if (queryDelegationDto.typeCode) {
      filter.$or = [
        { applyToAll: true },
        { specificTypeCode: { $in: [queryDelegationDto.typeCode] } },
      ];
    }

    return paginate(this.delegationModel, queryDelegationDto, filter, {
      sort: { createdAt: -1 },
    });
  }

  async findOne(id: string) {
    const delegation = await this.delegationModel.findById(id);

    if (!delegation) {
      throw new NotFoundException(`Delegation ${id} not found`);
    }

    return delegation;
  }

  async update(id: string, updateDelegationDto: UpdateDelegationDto) {
    this.validateCreateOrUpdate(updateDelegationDto);

    const existingDelegation = await this.delegationModel.findById(id).lean();
    if (!existingDelegation) {
      throw new NotFoundException(`Delegation ${id} not found`);
    }

    const fromUserId = String(
      updateDelegationDto.fromUserId ?? existingDelegation.fromUserId,
    );
    const toUserId = String(
      updateDelegationDto.toUserId ?? existingDelegation.toUserId,
    );

    await this.validateHierarchyDelegation(fromUserId, toUserId);

    const payload: Record<string, any> = {
      ...updateDelegationDto,
    };

    if (updateDelegationDto.startDate) {
      payload.startDate = new Date(updateDelegationDto.startDate);
    }

    if (updateDelegationDto.endDate) {
      payload.endDate = new Date(updateDelegationDto.endDate);
    }

    if (updateDelegationDto.applyToAll === true) {
      payload.specificTypeCode = [];
    }

    const updated = await this.delegationModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException(`Delegation ${id} not found`);
    }

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.delegationModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException(`Delegation ${id} not found`);
    }

    return deleted;
  }

  async findDelegatorsByDelegatee(
    toUserId: string,
    typeCode?: string,
    atDate: Date = new Date(),
  ): Promise<string[]> {
    // Return owners that currently delegate to this user.
    // Used to expand approver inbox and action permission checks.
    const query = this.buildActiveDelegationQuery({
      toUserId,
      typeCode,
      atDate,
    });

    const delegations = await this.delegationModel
      .find(query)
      .select('fromUserId')
      .lean()
      .exec();

    return delegations.map((item) => String(item.fromUserId));
  }

  async canActOnBehalf(
    fromUserId: string,
    actorUserId: string,
    typeCode?: string,
    atDate: Date = new Date(),
  ): Promise<boolean> {
    // Fast-path: owner always can act on own step even without delegation.
    if (fromUserId === actorUserId) {
      return true;
    }

    const query = this.buildActiveDelegationQuery({
      fromUserId,
      toUserId: actorUserId,
      typeCode,
      atDate,
    });

    const delegation = await this.delegationModel
      .findOne(query)
      .select('_id')
      .lean()
      .exec();
    return !!delegation;
  }

  private buildActiveDelegationQuery(params: {
    fromUserId?: string;
    toUserId?: string;
    typeCode?: string;
    atDate: Date;
  }): Record<string, any> {
    // Effective delegation means: active flag + in date range + matching type scope.
    const query: Record<string, any> = {
      isActive: true,
      startDate: { $lte: params.atDate },
      endDate: { $gte: params.atDate },
    };

    if (params.fromUserId) {
      query.fromUserId = params.fromUserId;
    }

    if (params.toUserId) {
      query.toUserId = params.toUserId;
    }

    if (params.typeCode) {
      query.$or = [
        { applyToAll: true },
        { specificTypeCode: { $in: [params.typeCode] } },
      ];
    }

    return query;
  }

  private validateCreateOrUpdate(
    delegationDto: Partial<CreateDelegationDto | UpdateDelegationDto>,
  ): void {
    if (delegationDto.fromUserId && delegationDto.toUserId) {
      if (delegationDto.fromUserId === delegationDto.toUserId) {
        throw new BadRequestException(
          'fromUserId và toUserId không được trùng nhau',
        );
      }
    }

    if (
      delegationDto.startDate &&
      delegationDto.endDate &&
      new Date(delegationDto.startDate) > new Date(delegationDto.endDate)
    ) {
      throw new BadRequestException('startDate phải nhỏ hơn hoặc bằng endDate');
    }

    if (
      delegationDto.applyToAll === false &&
      (!delegationDto.specificTypeCode ||
        delegationDto.specificTypeCode.length === 0)
    ) {
      throw new BadRequestException(
        'specificTypeCode bắt buộc khi applyToAll = false',
      );
    }
  }

  private async validateHierarchyDelegation(
    fromUserId: string,
    toUserId: string,
  ): Promise<void> {
    // Prevent upward bypass: delegatee must be managerial and at least the required hierarchy level.
    const [fromUser, toUser] = await Promise.all([
      this.getUserHierarchyProfile(fromUserId),
      this.getUserHierarchyProfile(toUserId),
    ]);

    const toRole = this.normalizeRoleName(toUser.roleName);
    if (toRole !== 'MANAGER' && toRole !== 'ADMIN') {
      throw new BadRequestException(
        'Người được ủy quyền phải có vai trò quản lý (MANAGER/ADMIN)',
      );
    }

    if (toUser.level < this.MANAGER_MIN_LEVEL) {
      throw new BadRequestException(
        `Người được ủy quyền phải có level >= ${this.MANAGER_MIN_LEVEL}`,
      );
    }

    const requiredLevel = Math.max(this.MANAGER_MIN_LEVEL, fromUser.level);
    if (toUser.level < requiredLevel) {
      throw new BadRequestException(
        `Người được ủy quyền phải có level >= ${requiredLevel} theo cấp bậc người ủy quyền`,
      );
    }
  }

  private async getUserHierarchyProfile(userId: string): Promise<{
    level: number;
    roleName: string;
  }> {
    const userDoc = await this.userModel
      .findById(userId)
      .populate('roleId', 'name')
      .populate('positionId', 'level')
      .lean()
      .exec();

    if (!userDoc) {
      throw new BadRequestException(`Không tìm thấy user ${userId}`);
    }

    const roleName = this.extractRoleName(userDoc.roleId);
    const level = this.extractLevel(userDoc.positionId);

    if (!roleName || !level) {
      throw new BadRequestException(
        `Thiếu dữ liệu role/position cho user ${userId}`,
      );
    }

    return { level, roleName };
  }

  private extractRoleName(role: unknown): string {
    if (!role) {
      return '';
    }

    if (typeof role === 'string') {
      return role;
    }

    if (typeof role === 'object' && 'name' in role) {
      const name = (role as { name?: unknown }).name;
      return typeof name === 'string' ? name : '';
    }

    return '';
  }

  private extractLevel(position: unknown): number {
    if (!position) {
      return 0;
    }

    if (typeof position === 'object' && 'level' in position) {
      const level = (position as { level?: unknown }).level;
      return typeof level === 'number' ? level : Number(level ?? 0);
    }

    return 0;
  }

  private normalizeRoleName(roleName: string): string {
    return String(roleName ?? '').toUpperCase();
  }

  private async generateDisplayId(): Promise<string> {
    const modulePrefix = 'DGT';
    const dateSegment = this.getDateSegment(new Date());
    const counterKey = `${modulePrefix}-${dateSegment}`;

    // Atomic increment by key (module + day) prevents duplicate IDs under concurrency.
    const counter = await this.counterModel
      .findOneAndUpdate(
        { _id: counterKey },
        { $inc: { seq: 1 } },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      )
      .lean<{ seq?: number }>()
      .exec();

    const sequence = Number(counter?.seq ?? 0);
    if (!sequence || sequence > 9999) {
      throw new BadRequestException(
        `Display ID sequence for ${counterKey} is out of supported range`,
      );
    }

    return `${modulePrefix}-${dateSegment}-${String(sequence).padStart(4, '0')}`;
  }

  private getDateSegment(date: Date): string {
    // ddmmyy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}${month}${year}`;
  }
}
