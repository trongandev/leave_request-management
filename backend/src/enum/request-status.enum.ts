export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  RETURNED = 'returned',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

// Array of all valid request status values for enum validation in Mongoose schema
export const REQUEST_STATUS_ARRAY = Object.values(RequestStatus) as string[];
