import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileSpreadsheet } from "lucide-react";
import { exportToExcel } from "@/utils/exportUtils";
import type { ExportColumn } from "@/utils/exportUtils";
import type { Service } from "@/types/service";

interface ExportServiceDialogProps {
  allServices: Service[];
  filteredServices: Service[];
  paginatedServices: Service[];
}

const ALL_COLUMNS: ExportColumn[] = [
  { key: "name", label: "Service Name" },
  { key: "description", label: "Description" },
  { key: "language", label: "Language" },
  { key: "framework", label: "Framework" },
  { key: "version", label: "Version" },
  { key: "status", label: "Status" },
  { key: "team", label: "Team" },
  { key: "developer", label: "Owner" },
  { key: "lifecycle", label: "Lifecycle Stage" },
  { key: "lastDeployed", label: "Last Deployed" },
  { key: "repository", label: "Repository URL" },
];

export function ExportServiceDialog({
  allServices,
  filteredServices,
  paginatedServices,
}: ExportServiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [filename, setFilename] = useState(
    `services_catalog_${new Date().toISOString().split("T")[0]}`
  );
  const [scope, setScope] = useState<"current" | "filtered" | "all">("filtered");
  const [format, setFormat] = useState<"xlsx" | "csv">("xlsx");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "name",
    "language",
    "team",
    "developer",
    "status",
    "lastDeployed",
  ]);

  const handleColumnToggle = (key: string) => {
    setSelectedColumns((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const handleExport = () => {
    let dataToExport: Service[] = [];

    switch (scope) {
      case "current":
        dataToExport = paginatedServices;
        break;
      case "filtered":
        dataToExport = filteredServices;
        break;
      case "all":
        dataToExport = allServices;
        break;
    }

    const columns = ALL_COLUMNS.filter((col) => selectedColumns.includes(col.key));

    exportToExcel(dataToExport, columns, filename, format);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Services</DialogTitle>
          <DialogDescription>
            Export service data to Excel or CSV format.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Data Scope */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Data Scope</Label>
            <RadioGroup
              value={scope}
              onValueChange={(value) => setScope(value as any)}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current" id="scope-current" />
                <Label htmlFor="scope-current" className="font-normal">
                  Current Page (Visible rows only)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="filtered" id="scope-filtered" />
                <Label htmlFor="scope-filtered" className="font-normal">
                  Filtered List (Matches current search/filters)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="scope-all" />
                <Label htmlFor="scope-all" className="font-normal">
                  All Services (Entire database)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Columns Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Columns</Label>
            <div className="grid grid-cols-2 gap-3 border rounded-md p-3 max-h-[200px] overflow-y-auto">
              {ALL_COLUMNS.map((col) => (
                <div key={col.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`col-${col.key}`}
                    checked={selectedColumns.includes(col.key)}
                    onCheckedChange={() => handleColumnToggle(col.key)}
                  />
                  <Label htmlFor={`col-${col.key}`} className="text-sm font-normal cursor-pointer">
                    {col.label}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span className="cursor-pointer hover:text-primary" onClick={() => setSelectedColumns(ALL_COLUMNS.map(c => c.key))}>Select All</span>
                <span className="cursor-pointer hover:text-primary" onClick={() => setSelectedColumns([])}>Clear All</span>
            </div>
          </div>

          {/* Format & Filename */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Format</Label>
                <RadioGroup
                    value={format}
                    onValueChange={(value) => setFormat(value as any)}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="xlsx" id="fmt-xlsx" />
                        <Label htmlFor="fmt-xlsx">Excel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="csv" id="fmt-csv" />
                        <Label htmlFor="fmt-csv">CSV</Label>
                    </div>
                </RadioGroup>
             </div>
             
             <div className="space-y-2">
                <Label htmlFor="filename">Filename</Label>
                <Input 
                    id="filename" 
                    value={filename} 
                    onChange={(e) => setFilename(e.target.value)} 
                />
             </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Export File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

