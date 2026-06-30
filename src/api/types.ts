export interface Patient {
  id: string;
  phn: string; // Personal Health Number
  name: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber: string;
  email?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  name: string;
  type: 'MEDICINE' | 'SERVICE' | 'INVESTIGATION' | 'OTHER';
  unitPrice: number;
  stockQuantity?: number;
}

export interface BillItem {
  id: string;
  billId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Bill {
  id: string;
  patientId: string;
  patientName: string;
  encounterId?: string;
  items: BillItem[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  status: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'VOID';
  createdAt: string;
  updatedAt: string;
}

export interface SessionInstance {
  id: string;
  name: string;
  status: 'ACTIVE' | 'CLOSED';
  openedAt: string;
  closedAt?: string;
}

export interface PatientEncounter {
  id: string;
  patientId: string;
  sessionId: string;
  staffId: string;
  complaints: string;
  diagnosis: string;
  status: 'WAITING' | 'IN_SESSION' | 'COMPLETED' | 'EMERGENCY';
  createdAt: string;
  updatedAt: string;
}

export interface PatientInvestigation {
  id: string;
  encounterId: string;
  itemId: string;
  itemName: string;
  result?: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  encounterId: string;
  itemId: string;
  itemName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Staff {
  id: string;
  username: string;
  name: string;
  role: 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST';
  privileges: string[];
  email?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface ApiError {
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
}
