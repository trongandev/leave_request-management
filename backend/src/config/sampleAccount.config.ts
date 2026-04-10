import { orgStructure } from './orgStructure.config';

export type RoleSeedName = 'ADMIN' | 'MANAGER' | 'HR' | 'EMPLOYEE';

export type SampleAccountSeed = {
  // Stable key used for human-readable seed tracking.
  key: string;
  // Role mapping name used to resolve roleId at seed time.
  roleName: RoleSeedName;
  // Department code from orgStructure to resolve departmentId.
  departmentCode: string;
  // Position short name to resolve positionId.
  positionName: string;
  // Optional manager relationship by seed key (resolved after upsert pass).
  managerKey?: string;
  // Optional deterministic join date to derive seniority-based leave days.
  joinedAt?: string;
  // Optional manual policy adjustment applied on top of base + seniority.
  adjustedDays?: number;
  // Optional initial used leave days for richer dashboard/test data.
  usedDays?: number;
};

// Non-admin seeded accounts share the same default password as fake-user flow.
export const SEED_DEFAULT_PASSWORD = 'Password@123';

function buildKeyLeaderAccounts(): SampleAccountSeed[] {
  // Auto-build level-8 leaders so config stays in sync with orgStructure.
  return orgStructure
    .flatMap((department) =>
      department.positions
        .filter((position) => position.level === 8)
        .map((position) => {
          const roleName: RoleSeedName =
            department.code === 'HR' ? 'HR' : 'MANAGER';

          return {
            key: `leader-${department.code}-${position.name}`,
            roleName,
            departmentCode: department.code,
            positionName: position.name,
          };
        }),
    )
    .sort((a, b) => a.key.localeCompare(b.key));
}

const extraManagerEmployeePairs: SampleAccountSeed[] = [
  // Additional direct manager/employee pairs for quick UI workflow testing.
  {
    key: 'mgr-tech-001',
    roleName: 'MANAGER',
    departmentCode: 'TECH',
    positionName: 'TL',
    joinedAt: '2011-06-15',
    adjustedDays: 2,
    usedDays: 1,
  },
  {
    key: 'emp-tech-001',
    roleName: 'EMPLOYEE',
    departmentCode: 'TECH',
    positionName: 'SWE',
    managerKey: 'mgr-tech-001',
    joinedAt: '2019-03-20',
    adjustedDays: 1,
    usedDays: 1,
  },
  {
    key: 'mgr-rnd-001',
    roleName: 'MANAGER',
    departmentCode: 'RND',
    positionName: 'RDL',
    joinedAt: '2009-09-10',
    adjustedDays: 3,
    usedDays: 2,
  },
  {
    key: 'emp-rnd-001',
    roleName: 'EMPLOYEE',
    departmentCode: 'RND',
    positionName: 'RE',
    managerKey: 'mgr-rnd-001',
    joinedAt: '2017-11-01',
    adjustedDays: 1,
    usedDays: 1,
  },
  {
    key: 'mgr-mkt-001',
    roleName: 'MANAGER',
    departmentCode: 'MKT',
    positionName: 'MKL',
    joinedAt: '2013-02-18',
    adjustedDays: 2,
    usedDays: 1,
  },
  {
    key: 'emp-mkt-001',
    roleName: 'EMPLOYEE',
    departmentCode: 'MKT',
    positionName: 'MKE',
    managerKey: 'mgr-mkt-001',
    joinedAt: '2022-07-05',
    adjustedDays: 0,
    usedDays: 0,
  },
  {
    key: 'emp-tech-new-2026-01',
    roleName: 'EMPLOYEE',
    departmentCode: 'TECH',
    positionName: 'SWE',
    managerKey: 'mgr-tech-001',
    joinedAt: '2026-02-10',
    adjustedDays: 0,
    usedDays: 0,
  },
  {
    key: 'emp-rnd-new-2026-04',
    roleName: 'EMPLOYEE',
    departmentCode: 'RND',
    positionName: 'RE',
    managerKey: 'mgr-rnd-001',
    joinedAt: '2026-04-18',
    adjustedDays: 0,
    usedDays: 0,
  },
];

export const sampleAccountSeed: SampleAccountSeed[] = [
  // Keep only non-admin accounts here; admin is seeded by legacy admin logic.
  ...buildKeyLeaderAccounts(),
  ...extraManagerEmployeePairs,
];
