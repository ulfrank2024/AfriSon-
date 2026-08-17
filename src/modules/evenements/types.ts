export const EVENT_TYPES = ["concert", "seminaire"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type Event = {
  id: string;
  type: EventType;
  country: string;
  venue: string;
  date: Date;
  capacity: number;
};
