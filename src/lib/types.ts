export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  phoneNumber: string;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
  creatorId: string;
}

export interface EventItem {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  location: string;
  hostUserId: string;
  hostName?: string; // Denormalized for display
  groupId?: string;
  groupName?: string; // Denormalized for display
  registrationFee?: number;
  maxParticipants?: number;
  sendInvite?: boolean;
  reminderTiming?: '1day' | '2hours' | '1hour' | '30mins' | 'none';
  allowComments?: boolean;
  imageUrl?: string;
  eventLinkUrl?: string; // New field for external event link
  dataAiHint?: string;
  inviteesCount?: number;
  attendingMembersCount?: number;
  isUserHost?: boolean;
  isCalendarSynced?: boolean;
}

export interface NotificationItem {
  id: string;
  question: string;
  description?: string;
  dueDate?: string; // ISO string
  allowMultipleChoice?: boolean;
  allowComments?: boolean;
  hideVotes?: boolean;
  creatorId: string;
  groupId?: string;
  // Stats like vote counts, responses would be part of this or fetched separately
  status?: 'active' | 'closed';
  responsesCount?: number;
  userChoice?: string | string[]; // For multiple choice
}

export interface ShareItem {
  id: string;
  type: 'message' | 'report';
  content: string; // Message text or report summary/link
  senderId: string;
  recipientId?: string; // For direct messages
  groupId?: string; // For group shares/reports
  createdAt: string; // ISO string
}

export interface PaymentItem {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO string
  paymentMethod?: string; // e.g., "Stripe"
  price: number;
  currency: string; // e.g., "USD"
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  requesterId: string;
  payerId?: string;
  eventId?: string; // Link to an event if applicable
  productOrServiceInfo?: string;
  createdAt: string; // ISO string
}

// Used for checkbox list of members in Event creation
export interface SelectableMember extends User {
  selected?: boolean;
}
