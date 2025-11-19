import { create } from "zustand";
import type { Service } from "../types/service";

interface ServiceState {
  services: Service[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addService: (service: Service) => void;
  updateService: (id: number, updatedService: Partial<Service>) => void;
  deleteService: (id: number) => void;
  getServiceById: (id: number) => Service | undefined;
}

// Initial Mock Data
const initialServices: Service[] = [
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
  {
    id: 3,
    name: "Notification Service",
    description: "Service gửi thông báo qua Email, SMS, Push Notification.",
    language: "Python",
    version: "1.5.2",
    status: "unhealthy",
    lastDeployed: "2024-01-13",
    lifecycle: "Production",
    repository: "https://github.com/company/notification-service",
    developer: "Lê Văn C",
    team: "Platform Team",
    businessDomain: "Communications",
    framework: "FastAPI",
    tier: "Tier 2",
    tags: ["queue: rabbitmq", "email: sendgrid"],
    repositories: [],
    aliases: [],
    uptime: "95.0%",
    healthCheck: "Failing",
  },
  {
    id: 4,
    name: "Auth Service",
    description: "Centralized authentication service.",
    language: "TypeScript",
    version: "3.0.1",
    status: "healthy",
    lastDeployed: "2024-01-15",
    lifecycle: "Production",
    repository: "https://github.com/company/auth-service",
    developer: "Nguyễn Văn A",
    team: "Security Team",
    framework: "NestJS",
    tier: "Tier 0",
    tags: ["security", "auth", "oauth2"],
    repositories: [],
    aliases: [],
    uptime: "99.99%",
    healthCheck: "Passing",
  },
  {
    id: 5,
    name: "Analytics Service",
    description: "Data analytics and reporting.",
    language: "Python",
    version: "1.8.0",
    status: "degraded",
    lastDeployed: "2024-01-12",
    lifecycle: "Staging",
    repository: "https://github.com/company/analytics-service",
    developer: "Phạm Thị D",
    team: "Data Team",
    framework: "Django",
    tier: "Tier 3",
    tags: ["data", "analytics", "etl"],
    repositories: [],
    aliases: [],
    uptime: "98.5%",
    healthCheck: "Degraded",
  },
];

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: initialServices,
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  addService: (service) =>
    set((state) => ({
      services: [...state.services, service],
    })),
  updateService: (id, updatedService) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, ...updatedService } : s
      ),
    })),
  deleteService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
    })),
  getServiceById: (id) => get().services.find((s) => s.id === id),
}));
