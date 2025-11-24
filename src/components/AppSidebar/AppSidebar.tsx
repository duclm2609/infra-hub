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
import {
  Settings,
  FileText,
  Users,
  BarChart3,
  Home,
  LogOut,
} from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { useAuthStore } from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type View = "home" | "services-catalog" | "documents" | "users" | "settings";

interface AppSidebarProps {
  onViewChange?: (view: View) => void;
  currentView?: View;
}

export function AppSidebar({ onViewChange, currentView }: AppSidebarProps) {
  const { instance } = useMsal();
  const { user, logout } = useAuthStore();

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

  const handleLogout = async () => {
    try {
      logout(); // Clear store
      await instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin + "/login",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get user initials for avatar
  const getInitials = (name?: string, email?: string) => {
    if (name) {
      const parts = name.split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "U";
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="cursor-pointer">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <span className="text-xs font-semibold">
                      {getInitials(user?.name, user?.email)}
                    </span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || "User"}
                    </span>
                    <span className="truncate text-xs text-slate-500">
                      {user?.email || "No email"}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="end" className="w-56">
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
