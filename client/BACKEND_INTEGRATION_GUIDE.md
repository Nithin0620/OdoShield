# Backend Integration Guide for OdoShield Client

The OdoShield client is currently structured using mock data. However, there are explicitly marked areas throughout the React components where backend logic, routing, and TigerGraph database integration are required.

This document serves as a comprehensive map of all the backend integration points needed in the `client` directory.

## 1. Dashboard (`src/pages/Dashboard.tsx`)
The primary analytics and monitoring dashboard requires several endpoints to aggregate graph data:
*   **Dashboard Stats**: `GET /query/{graph_name}/dashboard_stats`
    *   *Need:* Returns aggregate counts - total vehicles scanned, fraud rings, avg loss, certificates issued.
*   **Suspicious Centers**: `GET /query/{graph_name}/top_suspicious_centers?limit=3`
    *   *Need:* Runs risk scoring on ServiceCenter vertices, ranked by connected fraud edges.
*   **Recently Flagged Vehicles**: `GET /query/{graph_name}/recently_flagged?limit=3`
    *   *Need:* Returns Vehicle vertices with a high risk score, ordered by detection date.
*   **Risk Distribution**: `GET /query/{graph_name}/risk_distribution`
    *   *Need:* Aggregates vehicle count by risk bucket (high/medium/low).
*   **Fraud Cluster Subgraph**: `GET /query/{graph_name}/fraud_cluster_subgraph?centerId=...`
    *   *Need:* Returns subgraph structure (nodes and edges for cars and service centers) to dynamically render the SVG Graph visualization instead of current mock data.

## 2. Vehicle Lookup (`src/pages/VehicleLookup.tsx`)
The search and filtering interface for vehicles requires a robust server-side search mechanism:
*   **Vehicle Search**: `GET /query/{graph_name}/vehicle_search?searchTerm=...`
    *   *Need:* Fetch `Vehicle` vertices. Expected attributes include vin, owner, make, model, year, city, state, riskScore, status, and lastChecked.
*   **Server-Side Filtering**: 
    *   *Need:* Replace the current client-side `filter()` array method with server-side full-text search across vertices (either interpreted or installed GSQL query).

## 3. Vehicle Report (`src/pages/VehicleReport.tsx`)
The detailed vehicle view needs connected graph insights for specific vehicles:
*   **Vehicle Details**: `GET /query/{graph_name}/vehicle_details?vin={vin}`
    *   *Need:* Fetch Vehicle vertex attributes (make, model, year, city, state, riskScore).
*   **Fraud Score / Anomaly Detection**: `GET /query/{graph_name}/fraud_probability?vin={vin}`
    *   *Need:* Run the anomaly detection algorithm and return a 0-100 probability gauge score.
*   **Mileage Timeline**: `GET /query/{graph_name}/mileage_timeline?vin={vin}`
    *   *Need:* Returns ordered `MileageRecord` edges/vertices detailing the source and verification status.
*   **Data Sources**: `GET /query/{graph_name}/data_sources?vin={vin}`
    *   *Need:* Returns `DataSource` vertices connected to the vehicle to show their individual verification statuses.
*   **Graph Connections**: `GET /query/{graph_name}/vehicle_connections?vin={vin}`
    *   *Need:* Traverse `Owner → Vehicle → ServiceCenter → Insurance` edges to fetch related risk entities.

## 4. Fraud Rings (`src/pages/FraudRings.tsx`)
The fraud ring detection UI heavily relies on graph community detection algorithms:
*   **Detect Fraud Rings**: `GET /query/{graph_name}/detect_fraud_rings`
    *   *Need:* Replace `mockFraudRings`. Needs to execute a community detection algorithm (e.g., connected components or label propagation) on the `Vehicle - ServiceCenter - Owner` graph structure to identify clusters of suspicious activity.
*   **Dynamic Visual Rendering**: 
    *   *Need:* Replace the hardcoded layout SVG with a dynamic node-link graph rendered from the query's vertex/edge response. A force-directed layout library (like d3-force) may be required on the client side once data arrives.

## 5. Trust Certificate (`src/pages/Certificate.tsx`)
The vehicle certification module requires data confirming vehicle authenticity:
*   **Vehicle Trust Status**: `GET /query/{graph_name}/trust_status?vin={vin}`
    *   *Need:* Returns trust score, verification status, and the certificate ID linked in the graph.
*   **Verification Progress**: `GET /query/{graph_name}/verification_schedule?vin={vin}`
    *   *Need:* Returns scheduling information like the last verification date and the next due date.
*   **Resale Value Impact**: 
    *   *Need:* Could be a computed field based on the respective trust score, or cross-referenced through an external valuation API integration.

## 6. Settings (`src/pages/Settings.tsx`)
User configurations and health statuses.
*   **User Preferences Storage**: 
    *   *Need:* Store alert thresholds, auto-flag mechanics, and notification preferences as actual attributes on `User` vertices in TigerGraph or inside an auxiliary RDMS/NoSQL database.
*   **Database Connectivity Status**:
    *   *Need:* Real-time ping/health check endpoints (`GET /echo` or `GET /endpoints` from TigerGraph) to verify connectivity. The UI should display live graph name, vertex/edge totals, and last sync/update timestamps instead of hardcoded strings.
