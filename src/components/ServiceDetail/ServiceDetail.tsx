import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  Activity,
  Code,
  AlertCircle,
  CheckCircle2,
  X,
  Plus,
  FileText,
  Settings,
  Network,
  Heart,
} from "lucide-react";

interface ServiceDetailProps {
  serviceId: number;
  onBack: () => void;
}

// Mock service data - in real app this would come from API
const getServiceById = (id: number) => {
  const services = [
    {
      id: 1,
      name: "User Service",
      description:
        "Service quản lý thông tin người dùng, xác thực và phân quyền. Cung cấp API cho các service khác để truy vấn thông tin user.",
      language: "TypeScript",
      version: "1.2.3",
      status: "healthy",
      lastDeployed: "2024-01-15",
      lifecycle: "Production",
      repository: "https://github.com/company/user-service",
      developer: "Nguyễn Văn A",
      team: "Backend Team",
      businessDomain: "User Management, Authentication",
      ciCdPipeline: "GitHub Actions",
      pipelineStatus: "success",
      lastPipelineRun: "2024-01-15 10:30 AM",
      environment: "Production",
      healthCheck: "Passing",
      uptime: "99.9%",
      endpoints: 12,
      product: "Core Platform",
      framework: "Express",
      tier: "Tier 1",
      tags: ["db: postgresql", "api-version: v1", "auth: jwt"],
      repositories: [
        {
          name: "User Service Code",
          type: "github",
          url: "https://github.com/company/user-service",
        },
      ],
      aliases: ["user_service", "UserService", "user"],
    },
    {
      id: 2,
      name: "Payment Service",
      description:
        "Service xử lý các giao dịch thanh toán, tích hợp với các cổng thanh toán bên thứ ba. Đảm bảo bảo mật và tuân thủ PCI DSS.",
      language: "Java",
      version: "2.1.0",
      status: "healthy",
      lastDeployed: "2024-01-14",
      lifecycle: "Production",
      repository: "https://github.com/company/payment-service",
      developer: "Trần Thị B",
      team: "Payment Team",
      businessDomain: "Payment Processing, Financial Transactions",
      ciCdPipeline: "Jenkins",
      pipelineStatus: "success",
      lastPipelineRun: "2024-01-14 09:15 AM",
      environment: "Production",
      healthCheck: "Passing",
      uptime: "99.8%",
      endpoints: 8,
      product: "Payment Platform",
      framework: "Spring Boot",
      tier: "Tier 1",
      tags: ["db: mysql", "payment-gateway: stripe", "security-tier: 1"],
      repositories: [
        {
          name: "Payment Service Code",
          type: "github",
          url: "https://github.com/company/payment-service",
        },
      ],
      aliases: ["payment_service", "PaymentService", "payment"],
    },
  ];

  return services.find((s) => s.id === id) || services[0];
};

export function ServiceDetail({ serviceId, onBack }: ServiceDetailProps) {
  const service = getServiceById(serviceId);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    language: service.language,
    version: service.version,
    lifecycle: service.lifecycle,
    developer: service.developer,
    team: service.team,
    businessDomain: service.businessDomain,
  });

  // onBack is handled by Dashboard header
  void onBack;

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving service:", formData);
    setIsEditDialogOpen(false);
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500">Healthy</Badge>;
      case "unhealthy":
        return <Badge className="bg-red-500">Unhealthy</Badge>;
      case "degraded":
        return <Badge className="bg-yellow-500">Degraded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Tabs defaultValue="summary" className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col">
        {/* Title and Description */}
        <div className="px-4 md:px-6 pt-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{service.name}</h1>
                {getStatusIcon(service.status)}
                {getStatusBadge(service.status)}
              </div>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Edit className="h-4 w-4" />
                  Cập nhật thông tin
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Cập nhật thông tin Service</DialogTitle>
                  <DialogDescription>
                    Chỉnh sửa thông tin của service {service.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Tên Service</label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Mô tả</label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Ngôn ngữ</label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) =>
                          setFormData({ ...formData, language: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TypeScript">TypeScript</SelectItem>
                          <SelectItem value="Java">Java</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="Go">Go</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Version</label>
                      <Input
                        value={formData.version}
                        onChange={(e) =>
                          setFormData({ ...formData, version: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Vòng đời</label>
                    <Select
                      value={formData.lifecycle}
                      onValueChange={(value) =>
                        setFormData({ ...formData, lifecycle: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Staging">Staging</SelectItem>
                        <SelectItem value="Production">Production</SelectItem>
                        <SelectItem value="Deprecated">Deprecated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">
                        Người phát triển
                      </label>
                      <Input
                        value={formData.developer}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            developer: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Team sở hữu</label>
                      <Input
                        value={formData.team}
                        onChange={(e) =>
                          setFormData({ ...formData, team: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">
                      Nghiệp vụ phục vụ
                    </label>
                    <Input
                      value={formData.businessDomain}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessDomain: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button onClick={handleSave}>Lưu thay đổi</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Sticky Tabs */}
        <div className="sticky top-16 z-10 bg-background px-4 md:px-6">
          <TabsList>
            <TabsTrigger value="summary" className="gap-2">
              <FileText className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="operations" className="gap-2">
              <Settings className="h-4 w-4" />
              Operations
            </TabsTrigger>
            <TabsTrigger value="dependencies" className="gap-2">
              <Network className="h-4 w-4" />
              Dependencies
            </TabsTrigger>
            <TabsTrigger value="health" className="gap-2">
              <Heart className="h-4 w-4" />
              Health Report
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="px-4 md:px-6 pt-6 pb-6">
            <TabsContent value="summary" className="mt-0">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Service Overview */}
                  <Card className="rounded-md">
                    <CardHeader>
                      <CardTitle>Service Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Product
                          </p>
                          <p className="font-medium">{service.product}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Owner
                          </p>
                          <div className="space-y-1">
                            <p className="font-medium">{service.team}</p>
                            <p className="text-sm text-muted-foreground">
                              {service.developer}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Language
                          </p>
                          <p className="font-medium">{service.language}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Framework
                          </p>
                          <p className="font-medium">{service.framework}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Tier
                          </p>
                          <p className="font-medium">{service.tier}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Lifecycle Stage
                          </p>
                          <p className="font-medium">{service.lifecycle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card className="rounded-md">
                    <CardHeader>
                      <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="gap-2 px-3 py-1"
                          >
                            {tag}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 hover:bg-transparent"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm" className="gap-2">
                          <Plus className="h-3 w-3" />
                          Add Tag
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Repositories */}
                  <Card className="rounded-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Repositories</CardTitle>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {service.repositories.map((repo, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {repo.name}
                          </a>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Aliases */}
                  <Card className="rounded-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle>Aliases</CardTitle>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <AlertCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {service.aliases.map((alias, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            {index === 0 && (
                              <AlertCircle className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span className="font-mono">{alias}</span>
                          </div>
                          {index > 0 && (
                            <Button variant="ghost" size="sm" className="h-6">
                              Delete
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 mt-2"
                      >
                        <Plus className="h-3 w-3" />
                        Add Alias
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="operations" className="mt-0">
              <Card className="rounded-md">
                <CardHeader>
                  <CardTitle>Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Operations information will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dependencies" className="mt-0">
              <Card className="rounded-md">
                <CardHeader>
                  <CardTitle>Dependencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Dependencies information will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="mt-0">
              <Card className="rounded-md">
                <CardHeader>
                  <CardTitle>Health Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Health Check
                      </p>
                      <p className="font-medium">{service.healthCheck}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                      <p className="font-medium">{service.uptime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Endpoints</p>
                      <p className="font-medium">{service.endpoints}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Last Deployed
                      </p>
                      <p className="font-medium">{service.lastDeployed}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </Tabs>
  );
}
