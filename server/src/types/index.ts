// Common error response type
export interface ErrorResponse {
  error: {
    message: string;
    code: string;
    details?: Record<string, unknown>;
  };
}

// Success response
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

// TigerGraph query response
export interface TigerGraphResponse<T> {
  version: string;
  queryName: string;
  results: T[];
  exceptions?: Array<{
    parsed: boolean;
    reason: string;
    message: string;
  }>;
}

// Vehicle types
export interface Vehicle {
  v_id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  owner_id: string;
  registered_date: string;
  mileage: number;
  attributes?: Record<string, unknown>;
}

// Fraud detection types
export interface FraudIndicator {
  indicator_type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: string;
  source: string;
}

export interface FraudScore {
  vehicle_id: string;
  score: number;
  risk_level: "low" | "medium" | "high";
  indicators: FraudIndicator[];
  last_updated: string;
}

// Data source types
export interface DataSource {
  v_id: string;
  source_type: string;
  source_name: string;
  last_verified: string;
  status: "active" | "inactive" | "pending";
}

// Mileage entry
export interface MileageEntry {
  timestamp: string;
  mileage: number;
  source_type: string;
  anomaly_score?: number;
}
