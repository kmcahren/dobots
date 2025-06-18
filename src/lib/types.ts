
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  phoneNumber: string; // Required for app users / login
  email?: string; // Optional for app users
  notes?: string; // Optional for app users
}

export interface Contact {
  id: string; // Auto-generated on save
  name: string;
  phoneNumber?: string;
  email?: string;
  avatarUrl?: string;
  notes?: string;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
  creatorId: string;
}

export type RsvpStatus = 'attending' | 'declined' | 'unconfirmed';

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
  eventLinkUrl?: string;
  dataAiHint?: string;
  inviteesCount?: number;
  attendingMembersCount?: number;
  cancelledMembersCount?: number;
  isUserHost?: boolean; // Is the current viewing user the host?
  isCalendarSynced?: boolean;
  currentUserRsvpStatus?: RsvpStatus; // RSVP status of the current viewing user
}

export type NotificationUserChoice = 'yes' | 'no' | 'unconfirmed' | string[]; // string[] for multiple choice

export interface NotificationItem {
  id: string;
  question: string;
  description?: string;
  dueDate?: string; // ISO string
  allowMultipleChoice?: boolean;
  options?: string[]; // For multiple choice
  allowComments?: boolean;
  hideVotes?: boolean;
  creatorId: string;
  groupId?: string;
  status?: 'active' | 'closed';
  totalRecipientsCount?: number;
  yesResponsesCount?: number;
  noResponsesCount?: number;
  responsesCount?: number; // For multiple choice, total responses
  userChoice?: NotificationUserChoice; // User's current selection
}

export interface ShareItem {
  id: string;
  type: 'message' | 'report';
  content: string;
  senderId: string;
  recipientId?: string;
  groupId?: string;
  createdAt: string; // ISO string
}

export interface PaymentItem {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO string
  paymentMethod?: string;
  price: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  requesterId: string;
  payerId?: string;
  eventId?: string;
  productOrServiceInfo?: string;
  createdAt: string; // ISO string
  imageUrl?: string; // Optional image URL for the payment request
}

export interface SelectableMember extends User {
  selected?: boolean;
}
