# Tasks: Export Service List to Excel/CSV

## Relevant Files

- `src/components/ServiceCatalog/ServiceCatalog.tsx` - Main component where the Export button will be added.
- `src/components/ServiceCatalog/ExportServiceDialog.tsx` - New component for the export configuration dialog.
- `src/utils/exportUtils.ts` - Utility functions for generating CSV/Excel files (using `xlsx` or similar).
- `src/types/service.ts` - Service type definitions (already exists).

### Notes

- Use `xlsx` library for Excel generation.
- Use `file-saver` if needed for triggering downloads (though `xlsx` usually handles this).
- Unit tests should typically be placed alongside the code files they are testing.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

## Tasks

- [x] 0.0 Install dependencies
  - [x] 0.1 Install `xlsx` and `file-saver` (and their types) for handling Excel/CSV export.
- [x] 1.0 Implement Export Logic
  - [x] 1.1 Create `src/utils/exportUtils.ts` with functions to convert JSON data to Worksheet and download as `.xlsx` or `.csv`.
- [x] 2.0 Create Export Configuration Dialog
  - [x] 2.1 Create `src/components/ServiceCatalog/ExportServiceDialog.tsx`.
  - [x] 2.2 Implement UI for "Data Scope" (Current Page, Filtered List, All Services).
  - [x] 2.3 Implement UI for "Columns" selection (Checkboxes for Name, Language, Owner, Team, Status, etc.).
  - [x] 2.4 Implement UI for "Format" selection (.xlsx, .csv).
  - [x] 2.5 Implement UI for "Filename" input.
- [ ] 3.0 Integrate Export Feature
  - [ ] 3.1 Add "Export" button to `ServiceCatalog.tsx` (left of "New Service").
  - [ ] 3.2 Connect the button to open `ExportServiceDialog`.
  - [ ] 3.3 Pass necessary data (all services, filtered services, pagination info) to the dialog or handle data retrieval within the dialog/utils.
- [ ] 4.0 Testing & Refinement
  - [ ] 4.1 Verify export works for all scopes (Page/Filtered/All).
  - [ ] 4.2 Verify column selection works correctly.
  - [ ] 4.3 Verify file formats (.csv/.xlsx) are correct.
