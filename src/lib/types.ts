
// Consolidated User type (replaces the previous User definition if any)
export interface User {
  id: string;
  phoneNumber: string; // Primary key for the Person entity
  name: string;
  avatarUrl?: string;
  email?: string; // Optional email
  bio?: string; // Optional bio or notes (used 'bio' to align with profile)
  profilePictureUrl?: string; // Optional profile picture URL (used 'profilePictureUrl' to align with profile)
  is_authenticated_user: boolean; // Flag to indicate if this is an authenticated app user
  // Add other user-specific fields here if needed (e.g., passwordHash - though handle this securely)
  // ...
}

// Type for a contact within a user's contact list
export interface ContactListItem {
  id: string; // This could be the user's ID from the 'users' table
  phoneNumber: string;
  name: string;
  profilePictureUrl?: string;
  is_authenticated_user: boolean;
  userSpecificNotes?: string; // Notes the authenticated user has about this contact
  // Add other fields you want to display in the contact list
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

export interface PaymentGroup {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
}

export interface PaymentRequest {
  id: string;
  amount: number;
  description: string;
  assignedGroupId?: string;
  status: 'available' | 'assigned' | 'backorder';
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
