import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Activity, Plus } from "lucide-react";

// Mock data
const mockServices = [
  {
    id: 1,
    name: "User Service",
    language: "TypeScript",
    version: "1.2.3",
    status: "healthy",
    lastDeployed: "2024-01-15",
  },
  {
    id: 2,
    name: "Payment Service",
    language: "Java",
    version: "2.1.0",
    status: "healthy",
    lastDeployed: "2024-01-14",
  },
  {
    id: 3,
    name: "Notification Service",
    language: "Python",
    version: "1.5.2",
    status: "unhealthy",
    lastDeployed: "2024-01-13",
  },
  {
    id: 4,
    name: "Auth Service",
    language: "TypeScript",
    version: "3.0.1",
    status: "healthy",
    lastDeployed: "2024-01-15",
  },
  {
    id: 5,
    name: "Analytics Service",
    language: "Python",
    version: "1.8.0",
    status: "degraded",
    lastDeployed: "2024-01-12",
  },
  {
    id: 6,
    name: "Storage Service",
    language: "Go",
    version: "2.3.1",
    status: "healthy",
    lastDeployed: "2024-01-15",
  },
  {
    id: 7,
    name: "Gateway Service",
    language: "TypeScript",
    version: "1.0.5",
    status: "unhealthy",
    lastDeployed: "2024-01-11",
  },
  {
    id: 8,
    name: "Cache Service",
    language: "Go",
    version: "1.4.2",
    status: "healthy",
    lastDeployed: "2024-01-14",
  },
  {
    id: 9,
    name: "Search Service",
    language: "Java",
    version: "2.0.3",
    status: "healthy",
    lastDeployed: "2024-01-15",
  },
  {
    id: 10,
    name: "Report Service",
    language: "Python",
    version: "1.3.1",
    status: "degraded",
    lastDeployed: "2024-01-13",
  },
  {
    id: 11,
    name: "Email Service",
    language: "TypeScript",
    version: "1.7.0",
    status: "healthy",
    lastDeployed: "2024-01-14",
  },
  {
    id: 12,
    name: "SMS Service",
    language: "Java",
    version: "1.9.2",
    status: "healthy",
    lastDeployed: "2024-01-15",
  },
  {
    id: 13,
    name: "Log Service",
    language: "Go",
    version: "2.1.0",
    status: "healthy",
    lastDeployed: "2024-01-15",
  },
  {
    id: 14,
    name: "Monitor Service",
    language: "Python",
    version: "1.6.3",
    status: "unhealthy",
    lastDeployed: "2024-01-10",
  },
  {
    id: 15,
    name: "Config Service",
    language: "TypeScript",
    version: "1.1.8",
    status: "healthy",
    lastDeployed: "2024-01-14",
  },
];

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  Java: "bg-orange-500",
  Python: "bg-yellow-500",
  Go: "bg-cyan-500",
};

interface ServiceCatalogProps {
  onServiceClick?: (serviceId: number) => void;
}

export function ServiceCatalog({ onServiceClick }: ServiceCatalogProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate statistics
  const totalServices = mockServices.length;
  const unhealthyServices = mockServices.filter(
    (s) => s.status === "unhealthy" || s.status === "degraded"
  ).length;
  const healthyServices = mockServices.filter((s) => s.status === "healthy")
    .length;

  // Count services by language
  const languageDistribution = mockServices.reduce(
    (acc, service) => {
      acc[service.language] = (acc[service.language] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Get paginated services
  const paginatedServices = mockServices.slice(0, rowsPerPage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "unhealthy":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "degraded":
        return <Activity className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "healthy":
        return "Healthy";
      case "unhealthy":
        return "Unhealthy";
      case "degraded":
        return "Degraded";
      default:
        return status;
    }
  };

  const handleNewService = () => {
    // TODO: Implement new service creation
    console.log("New service button clicked");
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services Catalog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quản lý và theo dõi các services trong hệ thống
          </p>
        </div>
        <Button onClick={handleNewService} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          New Service
        </Button>
      </div>

      {/* Overview Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Services Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tổng số Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalServices}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tổng số services đang hoạt động
            </p>
          </CardContent>
        </Card>

        {/* Language Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Phân bổ theo ngôn ngữ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(languageDistribution).map(([lang, count]) => (
                <div key={lang} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${languageColors[lang] || "bg-gray-500"}`}
                    />
                    <span className="text-sm">{lang}</span>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Healthy</span>
                </div>
                <span className="text-sm font-medium">{healthyServices}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Có vấn đề</span>
                </div>
                <span className="text-sm font-medium text-red-500">
                  {unhealthyServices}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Table Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách Services</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Hiển thị {paginatedServices.length} trên tổng {totalServices}{" "}
                services
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Hiển thị:
              </span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => setRowsPerPage(Number(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Deployed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedServices.map((service) => (
                <TableRow
                  key={service.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onServiceClick?.(service.id)}
                >
                  <TableCell className="font-medium">
                    {service.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${languageColors[service.language] || "bg-gray-500"}`}
                      />
                      {service.language}
                    </div>
                  </TableCell>
                  <TableCell>{service.version}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      <span>{getStatusText(service.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{service.lastDeployed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

