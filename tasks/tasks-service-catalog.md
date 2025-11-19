# Tasks: Service Catalog System (MVP)

## Relevant Files

- `src/types/service.ts` - Type definitions for Service, Owner, and Metadata.
- `src/store/serviceStore.ts` - Zustand store for managing service state.
- `src/components/ServiceCatalog/ServiceCatalog.tsx` - Main component for displaying the list of services.
- `src/components/ServiceDetail/ServiceDetail.tsx` - Component for displaying detailed service information.
- `src/components/ServiceCreate/ServiceCreate.tsx` - Main container for service creation forms.
- `src/components/ServiceCreate/ManualForm.tsx` - Sub-component for manual entry form.
- `src/components/ServiceCreate/GitImportForm.tsx` - Sub-component for Git import form.
- `src/components/ServiceCreate/ScaffoldForm.tsx` - Sub-component for scaffolding new services.
- `src/components/ui/badge.tsx` - UI component for status indicators.
- `src/components/ui/card.tsx` - UI component for service cards.

### Notes

- Unit tests should typically be placed alongside the code files they are testing.
- Use `npx jest` to run tests.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature (e.g., `git checkout -b feature/service-catalog-mvp`)
- [x] 1.0 Implement Mock Data & State Management
  - [x] 1.1 Create `src/types/service.ts` to define interfaces for `Service`, `Owner`, `Team`, and `HealthStatus`.
  - [x] 1.2 Create `src/store/serviceStore.ts` using Zustand to manage the list of services, support adding new services, and updating existing ones.
  - [x] 1.3 Move existing mock data from `ServiceCatalog.tsx` and `ServiceDetail.tsx` into a shared mock data utility or initial state in the store.
- [x] 2.0 Implement Service Creation Flow (Registry & Onboarding)
  - [x] 2.1 Create `src/components/ServiceCreate/ServiceCreate.tsx` as a main page or dialog wrapper for creating services.
  - [x] 2.2 Implement `ManualForm.tsx` with form validation (Required: Name, Description, Owner, Team, Slack Channel, Repo URL).
  - [x] 2.3 Implement `GitImportForm.tsx` to accept a Git URL and simulate fetching `catalog-info.yaml` (mock the parse/fetch).
  - [x] 2.4 Implement `ScaffoldForm.tsx` to allow selecting a template (e.g., "React Frontend", "Go Backend") and generating a new service entry.
  - [x] 2.5 Integrate all forms into `ServiceCreate.tsx` using Tabs or a Stepper to switch between Manual, Git Import, and Scaffold modes.
  - [x] 2.6 Connect the Create forms to `useServiceStore` to actually add the new service to the global state.
- [ ] 3.0 Enhance Service Catalog (List View)
  - [ ] 2.6 Connect the Create forms to `useServiceStore` to actually add the new service to the global state.
- [x] 3.0 Enhance Service Catalog (List View)
  - [x] 3.1 Refactor `ServiceCatalog.tsx` to consume data from `useServiceStore` instead of local mock data.
  - [x] 3.2 Implement client-side filtering by "Team" and "Status" (Healthy, Degraded, Unhealthy).
  - [x] 3.3 Implement search functionality by Service Name.
  - [x] 3.4 Ensure the Status Badge accurately reflects the `status` field (Green/Red/Yellow).
- [x] 4.0 Enhance Service Detail Page
  - [x] 4.1 Refactor `ServiceDetail.tsx` to fetch service data from `useServiceStore` based on ID/Slug.
  - [x] 4.2 Add an "External Links" section to the overview tab (e.g., Links to Jenkins, Grafana, API Docs).
  - [x] 4.3 Ensure the "Health Status" section clearly displays "Up" or "Down" status with a visual indicator.
  - [x] 4.4 (Optional) Enable the "Edit" button to open a dialog that updates the service in `useServiceStore`.
- [x] 5.0 UI Polish & Navigation Integration
  - [x] 5.1 Update the App Sidebar/Navigation to include a link to the "Create Service" page.
  - [x] 5.2 Verify responsiveness of the Service Catalog table and forms on smaller screens.
  - [x] 5.3 Run linter and fix any styling or code consistency issues.
