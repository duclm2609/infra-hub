import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Settings, FileText, Users, BarChart3, Home } from "lucide-react";

type View = "home" | "services-catalog" | "documents" | "users" | "settings";

interface AppSidebarProps {
  onViewChange?: (view: View) => void;
  currentView?: View;
}

export function AppSidebar({ onViewChange, currentView }: AppSidebarProps) {
  const menuItems = [
    {
      title: "Home",
      icon: Home,
      view: "home" as View,
    },
    {
      title: "Services Catalog",
      icon: BarChart3,
      view: "services-catalog" as View,
    },
    {
      title: "Documents",
      icon: FileText,
      view: "documents" as View,
    },
    {
      title: "Users",
      icon: Users,
      view: "users" as View,
    },
    {
      title: "Settings",
      icon: Settings,
      view: "settings" as View,
    },
  ];

  const handleMenuItemClick = (view: View) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => handleMenuItemClick("home")}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-500 text-white">
                <Home className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">TCBS App</span>
                <span className="truncate text-xs">Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleMenuItemClick(item.view)}
                    isActive={currentView === item.view}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <span className="text-xs font-semibold">TC</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Tài khoản</span>
                  <span className="truncate text-xs">user@tcbs.com</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
