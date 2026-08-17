import {
  LIVE_SESSION_TEACHER_SHARE,
  STANDARD_SUBSCRIPTION_TEACHER_SHARE,
} from "./types";

export type RevenueSplit = {
  teacherAmount: number;
  platformAmount: number;
};

function splitAmount(amount: number, teacherShare: number): RevenueSplit {
  if (amount < 0) {
    throw new Error("amount must be >= 0");
  }
  if (teacherShare < 0 || teacherShare > 1) {
    throw new Error("teacherShare must be between 0 and 1");
  }

  const teacherAmount = Math.round(amount * teacherShare);
  return { teacherAmount, platformAmount: amount - teacherAmount };
}

/** Splits a standard subscription payment between teacher and platform. */
export function splitSubscriptionRevenue(amount: number): RevenueSplit {
  return splitAmount(amount, STANDARD_SUBSCRIPTION_TEACHER_SHARE);
}

/** Splits a live session payment between teacher and platform. */
export function splitLiveSessionRevenue(amount: number): RevenueSplit {
  return splitAmount(amount, LIVE_SESSION_TEACHER_SHARE);
}
