export type UserRole = 'supplier' | 'ngo' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  verified: boolean;
  joinedAt: Date;
  avatar?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'meals' | 'produce' | 'dairy' | 'bakery' | 'other';
  quantity: number;
  unit: 'kg' | 'portions' | 'liters' | 'pieces';
  expiresAt: Date;
  location: string;
  supplierId: string;
  status: 'available' | 'reserved' | 'collected' | 'expired';
  createdAt: Date;
}

export interface Donation {
  id: string;
  supplierId: string;
  ngoId: string;
  foodItems: FoodItem[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  scheduledPickup: Date;
  actualPickup?: Date;
  blockchainHash: string;
  value: number;
  impact: {
    mealsProvided: number;
    co2Saved: number;
    costSaved: number;
  };
  createdAt: Date;
}

export interface ForecastData {
  date: string;
  predicted: number;
  actual?: number;
  confidence: number;
  category: string;
}