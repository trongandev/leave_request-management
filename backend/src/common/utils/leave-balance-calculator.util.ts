/**
 * Input for leave entitlement calculation.
 *
 * - basePerYear: yearly base quota configured by policy (e.g. 12)
 * - joinedAt: employee join date used as service start date
 * - targetYear: year to calculate entitlement for
 * - now: optional reference date (mainly for deterministic tests)
 */
type LeaveEntitlementInput = {
  basePerYear: number;
  joinedAt: Date;
  targetYear: number;
  now?: Date;
};

/**
 * Breakdown result so callers can display/debug each part separately.
 *
 * - baseQuotaDays: yearly base quota for the target year (usually equals LEAVE_BASE_PER_YEAR)
 * - baseDays: backward-compatible alias of baseQuotaDays for existing callers
 * - effectiveBaseDays: base quota actually granted in this year (prorated in join year)
 * - seniorityDays: additional quota from 5-year milestones
 * - completedYears: full service years at calculation cut-off date
 * - workedMonths: counted months in targetYear using half-month rule
 */
export type LeaveEntitlementResult = {
  baseQuotaDays: number;
  baseDays: number;
  effectiveBaseDays: number;
  seniorityDays: number;
  completedYears: number;
  workedMonths: number;
};

/**
 * Round leave days with half-up rule: >= 0.5 rounds up, < 0.5 rounds down.
 */
function roundLeaveDays(value: number): number {
  return Math.floor(value + 0.5);
}

/**
 * Return the effective cut-off datetime for a target year.
 *
 * Rules:
 * - past year: use 31/12 23:59:59.999 of that year
 * - future year: use 01/01 00:00:00.000 of that year
 * - current year: use `now` (service-year and worked-months cut-off)
 */
export function getEffectiveYearEnd(
  targetYear: number,
  now = new Date(),
): Date {
  const currentYear = now.getFullYear();

  if (targetYear < currentYear) {
    return new Date(targetYear, 11, 31, 23, 59, 59, 999);
  }

  if (targetYear > currentYear) {
    return new Date(targetYear, 0, 1, 0, 0, 0, 0);
  }

  return now;
}

/**
 * Count full years of service (anniversary-based), not plain year subtraction.
 *
 * Example:
 * - from 2025-07-20 to 2026-07-19 => 0 years
 * - from 2025-07-20 to 2026-07-20 => 1 year
 */
export function getCompletedYearsOfService(
  fromDate: Date,
  toDate: Date,
): number {
  let years = toDate.getFullYear() - fromDate.getFullYear();
  const endMonth = toDate.getMonth();
  const startMonth = fromDate.getMonth();
  const endDay = toDate.getDate();
  const startDay = fromDate.getDate();

  if (endMonth < startMonth || (endMonth === startMonth && endDay < startDay)) {
    years -= 1;
  }

  return Math.max(0, years);
}

/**
 * Count worked months in `targetYear` using half-month rule.
 *
 * A month is counted when employee works at least half of that month days.
 * This supports policy text: "count +1 month only when current month has reached half month worked".
 */
export function getWorkedMonthsInYear(
  joinedAt: Date,
  targetYear: number,
  now = new Date(),
): number {
  const yearStart = new Date(targetYear, 0, 1, 0, 0, 0, 0);
  const effectiveEnd = getEffectiveYearEnd(targetYear, now);
  const workStart = joinedAt > yearStart ? joinedAt : yearStart;

  if (workStart > effectiveEnd) {
    return 0;
  }

  let countedMonths = 0;

  for (let month = 0; month < 12; month += 1) {
    const monthStart = new Date(targetYear, month, 1, 0, 0, 0, 0);
    const monthEnd = new Date(targetYear, month + 1, 0, 23, 59, 59, 999);

    const overlapStart = workStart > monthStart ? workStart : monthStart;
    const overlapEnd = effectiveEnd < monthEnd ? effectiveEnd : monthEnd;

    if (overlapStart > overlapEnd) {
      continue;
    }

    const workedDays =
      Math.floor(
        (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;
    const daysInMonth = new Date(targetYear, month + 1, 0).getDate();
    const halfMonthThreshold = Math.ceil(daysInMonth / 2);

    if (workedDays >= halfMonthThreshold) {
      countedMonths += 1;
    }
  }

  return countedMonths;
}

/**
 * Main policy calculator for yearly leave entitlement.
 *
 * Policy implemented:
 * 1) Year before join year:
 *    baseQuotaDays = 0, effectiveBaseDays = 0
 * 2) Join year:
 *    baseQuotaDays = basePerYear,
 *    effectiveBaseDays = (basePerYear / 12) * (12 - joinMonth + 1)
 * 3) Years after join year:
 *    baseQuotaDays = basePerYear, effectiveBaseDays = basePerYear
 * 4) Seniority bonus:
 *    seniorityDays = floor(completedYears / 5)
 * 5) Rounding:
 *    apply half-up rule (>= 0.5 up, < 0.5 down)
 */
export function calculateLeaveEntitlement(
  input: LeaveEntitlementInput,
): LeaveEntitlementResult {
  const { basePerYear, joinedAt, targetYear, now = new Date() } = input;
  const effectiveEnd = getEffectiveYearEnd(targetYear, now);
  const completedYears = getCompletedYearsOfService(joinedAt, effectiveEnd);
  const workedMonths = getWorkedMonthsInYear(joinedAt, targetYear, now);
  const joinYear = joinedAt.getFullYear();
  const joinMonth = joinedAt.getMonth() + 1;

  let baseQuotaDays = 0;
  let effectiveBaseDays = 0;

  if (targetYear < joinYear) {
    baseQuotaDays = 0;
    effectiveBaseDays = 0;
  } else if (targetYear === joinYear) {
    baseQuotaDays = roundLeaveDays(basePerYear);
    effectiveBaseDays = roundLeaveDays(
      (basePerYear / 12) * (12 - joinMonth + 1),
    );
  } else {
    baseQuotaDays = roundLeaveDays(basePerYear);
    effectiveBaseDays = roundLeaveDays(basePerYear);
  }

  // Seniority bonus is granted yearly once employee reaches each 5-year milestone.
  const seniorityDays = roundLeaveDays(Math.floor(completedYears / 5));

  return {
    baseQuotaDays,
    baseDays: baseQuotaDays,
    effectiveBaseDays,
    seniorityDays,
    completedYears,
    workedMonths,
  };
}
