import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ServiceCatalog } from "@/components/ServiceCatalog/ServiceCatalog";
import { ServiceDetail } from "@/components/ServiceDetail/ServiceDetail";

// Helper function to get service name
const getServiceName = (serviceId: number | null): string => {
  if (!serviceId) return "";

  const services = [
    { id: 1, name: "User Service" },
    { id: 2, name: "Payment Service" },
    { id: 3, name: "Notification Service" },
    { id: 4, name: "Auth Service" },
    { id: 5, name: "Analytics Service" },
    { id: 6, name: "Storage Service" },
    { id: 7, name: "Gateway Service" },
    { id: 8, name: "Cache Service" },
    { id: 9, name: "Search Service" },
    { id: 10, name: "Report Service" },
    { id: 11, name: "Email Service" },
    { id: 12, name: "SMS Service" },
    { id: 13, name: "Log Service" },
    { id: 14, name: "Monitor Service" },
    { id: 15, name: "Config Service" },
  ];

  return services.find((s) => s.id === serviceId)?.name || "";
};

interface DashboardProps {
  onLogout?: () => void;
}

type View =
  | "home"
  | "services-catalog"
  | "service-detail"
  | "certificate"
  | "device"
  | "documents"
  | "users"
  | "settings";

export function Dashboard({ onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    if (view !== "service-detail") {
      setSelectedServiceId(null);
    }
  };

  const handleServiceClick = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setCurrentView("service-detail");
  };

  const handleBackToCatalog = () => {
    setCurrentView("services-catalog");
    setSelectedServiceId(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case "service-detail":
        return (
          selectedServiceId && (
            <ServiceDetail
              serviceId={selectedServiceId}
              onBack={handleBackToCatalog}
            />
          )
        );
      case "services-catalog":
        return <ServiceCatalog onServiceClick={handleServiceClick} />;
      case "certificate":
      case "device":
      case "documents":
      case "users":
      case "settings":
        return (
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
                <svg
                  className="w-10 h-10 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Coming Soon
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Tính năng này đang được phát triển và sẽ sớm có mặt. Vui lòng
                  quay lại sau.
                </p>
              </div>
            </div>
          </div>
        );
      case "home":
      default:
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Chào mừng trở lại!</h2>
                <p className="text-sm text-muted-foreground">
                  Đây là trang dashboard của bạn. Bạn có thể bắt đầu sử dụng ứng
                  dụng ngay bây giờ.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Thống kê</h2>
                <p className="text-sm text-muted-foreground">
                  Xem các thống kê và báo cáo tại đây.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Thông báo</h2>
                <p className="text-sm text-muted-foreground">
                  Kiểm tra các thông báo mới nhất.
                </p>
              </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4">
              <h2 className="font-semibold mb-4">Nội dung chính</h2>
              <p className="text-sm text-muted-foreground">
                Đây là khu vực nội dung chính của dashboard. Bạn có thể thêm các
                component và tính năng tại đây.
              </p>
            </div>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (currentView) {
      case "service-detail": {
        const serviceName = getServiceName(selectedServiceId);
        return serviceName
          ? `Inventory / Service Catalog / ${serviceName}`
          : "Service Detail";
      }
      case "services-catalog":
        return "Inventory / Service Catalog";
      case "certificate":
        return "Inventory / Certificate";
      case "device":
        return "Inventory / Device";
      case "documents":
        return "Documents";
      case "users":
        return "Users";
      case "settings":
        return "Settings";
      case "home":
      default:
        return "Dashboard";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        onViewChange={handleViewChange}
        currentView={
          currentView === "service-detail" ? "services-catalog" : currentView
        }
      />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              {currentView === "service-detail" && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackToCatalog}
                    className="h-8 w-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-4" />
                </>
              )}
              <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </header>
        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
