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
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle2,
  Activity,
  Search,
  Filter,
} from "lucide-react";
import { ServiceCreate } from "@/components/ServiceCreate/ServiceCreate";
import { ExportServiceDialog } from "@/components/ServiceCatalog/ExportServiceDialog";
import { useServiceStore } from "@/store/serviceStore";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  Java: "bg-orange-500",
  Python: "bg-yellow-500",
  Go: "bg-cyan-500",
  "C#": "bg-purple-500",
};

interface ServiceCatalogProps {
  onServiceClick?: (serviceId: number) => void;
}

export function ServiceCatalog({ onServiceClick }: ServiceCatalogProps) {
  const { services } = useServiceStore();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [teamFilter, setTeamFilter] = useState<string>("all");

  // Extract unique teams for filter
  const uniqueTeams = Array.from(new Set(services.map((s) => s.team))).sort();

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || service.status === statusFilter;
    const matchesTeam = teamFilter === "all" || service.team === teamFilter;

    return matchesSearch && matchesStatus && matchesTeam;
  });

  // Calculate statistics (based on all services, not filtered)
  const totalServices = services.length;
  const unhealthyServices = services.filter(
    (s) => s.status === "unhealthy" || s.status === "degraded"
  ).length;
  const healthyServices = services.filter((s) => s.status === "healthy").length;

  // Count services by language
  const languageDistribution = services.reduce((acc, service) => {
    acc[service.language] = (acc[service.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get paginated services
  const paginatedServices = filteredServices.slice(0, rowsPerPage);

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

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services Catalog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quản lý và theo dõi các services trong hệ thống
          </p>
        </div>
        <div className="flex gap-2">
          <ExportServiceDialog
            allServices={services}
            filteredServices={filteredServices}
            paginatedServices={paginatedServices}
          />
          <ServiceCreate />
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Services Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Tổng số Services
            </CardTitle>
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
                      className={`h-3 w-3 rounded-full ${
                        languageColors[lang] || "bg-gray-500"
                      }`}
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Danh sách Services</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Hiển thị {paginatedServices.length} trên tổng{" "}
                {filteredServices.length} services
              </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={teamFilter} onValueChange={setTeamFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Team" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {uniqueTeams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="degraded">Degraded</SelectItem>
                    <SelectItem value="unhealthy">Unhealthy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => setRowsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 rows</SelectItem>
                  <SelectItem value="20">20 rows</SelectItem>
                  <SelectItem value="30">30 rows</SelectItem>
                  <SelectItem value="50">50 rows</SelectItem>
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
                <TableHead>Team</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Deployed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedServices.length > 0 ? (
                paginatedServices.map((service) => (
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
                          className={`h-2 w-2 rounded-full ${
                            languageColors[service.language] || "bg-gray-500"
                          }`}
                        />
                        {service.language}
                      </div>
                    </TableCell>
                    <TableCell>{service.team}</TableCell>
                    <TableCell>{service.version}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        <span>{getStatusText(service.status)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{service.lastDeployed}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No services found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
