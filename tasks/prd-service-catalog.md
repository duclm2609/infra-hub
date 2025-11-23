# Product Requirements Document: Service Catalog System (MVP)

## 1. Introduction
The Service Catalog System is a centralized portal designed to manage the inventory of hundreds of microservices within the organization. It aims to solve the challenge of fragmentation by providing a "single source of truth" for service ownership, metadata, and basic operational status. This system will facilitate better collaboration between Developers and Platform Teams by ensuring every service has clear ownership and health visibility.

## 2. Goals
- **Centralize Knowledge:** Create a searchable inventory of all microservices.
- **Standardize Ownership:** Ensure 100% of onboarded services have defined owners and contact channels.
- **Simplify Onboarding:** Allow easy registration of existing services (Manual/Git) and creation of new ones (Scaffolding).
- **Basic Visibility:** Provide immediate "Up/Down" health status for all services.
- **Data Portability:** Allow users to export service data for external reporting and analysis.

## 3. User Stories
- **As a Developer**, I want to register my existing service by providing a Git repository URL or filling out a form, so that it is visible to the rest of the organization.
- **As a Developer**, I want to scaffold a new microservice from approved templates, so that I can start a project with best practices already in place.
- **As a Platform Engineer**, I want to quickly identify the owner and Slack channel of a malfunctioning service, so that I can contact them immediately during an incident.
- **As a Developer/Platform Engineer**, I want to see the real-time "Up/Down" status of a service on its detail page, so I know if it's operational.
- **As a Manager**, I want to filter services by team or owner, so I can audit resource allocation.
- **As a Manager/Analyst**, I want to export the service list to an Excel or CSV file with specific columns (e.g., Owner, Language, Status), so I can perform custom analysis or reporting outside the tool.

## 4. Functional Requirements

### 4.1 Service Registry & Onboarding
1.  **Manual Registration:** Users must be able to create a service entry by manually filling in a form (Name, Description, Owner, Team, Repository URL).
2.  **Git Import:** Users must be able to import service metadata by providing a Git Repository URL (system reads a `catalog-info.yaml` or similar file if present, or pre-fills data based on repo info).
3.  **Service Scaffolding:** Users must be able to create a new service based on predefined templates (e.g., "React Frontend", "Go Backend"). This should generate a basic repository structure.

### 4.2 Metadata & Compliance (Basic)
4.  **Mandatory Ownership:** The system must enforce required fields for "Owner", "Team", and "Contact/Slack" during registration or creation.
5.  **Metadata Management:** Users must be able to edit/update service metadata after creation.

### 4.3 Monitoring (Basic)
6.  **Health Check:** The system must periodically check a configured health endpoint (e.g., `/healthz`) for each service.
7.  **Status Display:** The service detail page and list view must display a clear status indicator (Green/Up or Red/Down).

### 4.4 Discovery & Navigation
8.  **Service List:** A dashboard displaying all services with key info (Name, Owner, Status).
9.  **Search & Filter:** Users must be able to search by service name and filter by Team or Status.
10. **External Links:** Service pages must support links to external tools (e.g., Link to Jenkins, Link to Grafana Dashboard, Link to API Docs).

### 4.5 Data Export (New)
11. **Export Trigger:** A "Export" button must be available on the Service Catalog page (List View), positioned to the left of the "New Service" button.
12. **Export Configuration Dialog:** Clicking "Export" should open a dialog allowing the user to configure the export:
    - **Data Scope:** User can choose between "Current Page" (visible items), "Filtered List" (all items matching current filters), or "All Services" (entire database).
    - **Columns:** User can select which columns to export via checkboxes. Default selected columns: Name, Language, Owner, Status.
    - **Format:** User can select the output format: `.csv` or `.xlsx`.
    - **Filename:** User can input a custom filename (defaults to `services_catalog_[YYYY-MM-DD]`).
13. **File Download:** Upon confirmation, the system generates and downloads the file with the selected configuration.

## 5. Non-Goals (Out of Scope for MVP)
- **Deep Observability:** No graphs for Latency, Traffic, or Error rates (links to Grafana/Datadog are sufficient).
- **Advanced Ops Actions:** No triggering deployments, restarts, or rollbacks directly from this UI.
- **Deep Security Scanning:** No automated vulnerability scanning or dependency analysis in this phase.
- **Complex Compliance Scoring:** No "Service Scorecard" grading logic yet.

## 6. Design Considerations
- **UI/UX:** Clean, dashboard-style interface. Use existing Shadcn/UI components (Cards for services, Tables for lists, Badges for status).
- **Navigation:** Sidebar navigation (Dashboard, Catalog, Create Service).
- **Components:**
  - `ServiceCard`: Summary of a service.
  - `ServiceStatusBadge`: Visual indicator for health.
  - `ExportServiceDialog`: New component for export configuration.

## 7. Technical Considerations
- **Backend/Storage:** Needs a database to store service metadata.
- **Git Integration:** Needs integration with Git provider API (GitHub/GitLab) for fetching repo details and scaffolding.
- **Health Polling:** A background job or worker is needed to ping service health endpoints.
- **Export Library:** Use a client-side library like `xlsx` or `file-saver` to generate files to avoid backend overhead for MVP.

## 8. Success Metrics
- **Adoption:** 50+ services onboarded within the first month.
- **Compliance:** 100% of onboarded services have valid "Team" and "Slack" information.
- **Usability:** Developers can find a service owner in < 1 minute.
- **Data Usage:** At least 5 exports generated per week by managers.

## 9. Open Questions
- **Authentication:** How do we authenticate users? (Assume basic auth or SSO for now).
- **Scaffolding Output:** Where does the new code go? (Directly push to a new repo in the org, or download a zip?) -> _Assume push to new repo for now._
