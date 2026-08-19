export const leadStatuses = ["new", "in_review", "proposal_sent", "deposit_paid", "booked", "lost", "spam"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  partnerId: string | null;
  partnerName: string;
  listingName: string;
  travelerName: string;
  email: string;
  whatsapp: string;
  travelDates: string;
  groupSize: string;
  message: string;
  source: "website";
  bookingValue: number | null;
  commissionRate: number | null;
  expectedMargin: number | null;
  reconciliationStatus: "not_applicable" | "expected" | "invoiced" | "paid";
}

export interface CreateLeadInput {
  partnerId: string | null;
  partnerName: string;
  listingName: string;
  travelerName: string;
  email: string;
  whatsapp?: string;
  travelDates: string;
  groupSize: string;
  message: string;
  consent: boolean;
  website?: string;
}
