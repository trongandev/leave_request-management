import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from '../../counters/counters.schema';

@Injectable()
export class IdUtilService {
  constructor(
    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
  ) {}

  async generateDisplayId(modulePrefix: string): Promise<string> {
    // PATCH: Shared atomic ID generator - prevents duplicates under concurrency (audit fix 2.1)
    const dateSegment = this.getDateSegment(new Date());
    const counterKey = `${modulePrefix}-${dateSegment}`;

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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}${month}${year}`;
  }
}
