/**
 * API Client for OdoShield Backend
 * Handles all communication with TigerGraph via Express backend
 */

// Support both VITE and REACT env var patterns
const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL ||
   import.meta.env.VITE_APP_API_URL ||
   process.env.REACT_APP_API_URL ||
   'http://localhost:3000');

export interface VehicleDetails {
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fraud_risk_score: number;
  status: string;
}

export interface FraudData {
  success: boolean;
  data: unknown[];
}

export interface MileageRecord {
  record_id: string;
  mileage: number;
  recorded_date: string;
  source_id: string;
  verification_status: string;
}

/**
 * Fetch vehicle details from TigerGraph
 */
export async function getVehicleDetails(vin: string): Promise<FraudData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/query/fraud-graph/vehicle_details?vin=${encodeURIComponent(vin)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw error;
  }
}

/**
 * Get fraud probability/score for a vehicle
 */
export async function getFraudProbability(vin: string): Promise<FraudData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/query/fraud-graph/fraud_probability?vin=${encodeURIComponent(vin)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching fraud probability:', error);
    throw error;
  }
}

/**
 * Get mileage timeline for a vehicle
 */
export async function getMileageTimeline(
  vin: string,
  limit = 100,
  offset = 0
): Promise<FraudData> {
  try {
    const params = new URLSearchParams({
      vin: vin,
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}/api/query/fraud-graph/mileage_timeline?${params}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching mileage timeline:', error);
    throw error;
  }
}

/**
 * Get data sources for a vehicle
 */
export async function getDataSources(vin: string): Promise<FraudData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/query/fraud-graph/data_sources?vin=${encodeURIComponent(vin)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data sources:', error);
    throw error;
  }
}

/**
 * Get fraud connections/relationships for a vehicle
 */
export async function getVehicleConnections(vin: string): Promise<FraudData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/query/fraud-graph/vehicle_connections?vin=${encodeURIComponent(vin)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicle connections:', error);
    throw error;
  }
}

/**
 * Health check - verify backend is running
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get database stats/info
 */
export async function getStats(): Promise<FraudData> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}

/**
 * Generic query executor for custom endpoints
 */
export async function executeQuery(
  graphName: string,
  queryName: string,
  params: Record<string, string | number> = {}
): Promise<FraudData> {
  try {
    const queryParams = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );

    const response = await fetch(
      `${API_BASE_URL}/api/query/${graphName}/${queryName}?${queryParams}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error executing query ${graphName}/${queryName}:`, error);
    throw error;
  }
}
