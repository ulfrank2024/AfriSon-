export const PAYMENT_METHODS = ["mtn_momo", "orange_money", "carte"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_STATUSES = [
  "en_attente",
  "reussi",
  "echoue",
  "rembourse",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export type Payment = {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  flutterwaveTxRef: string;
};
