import { useState } from "react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Settings,
  FileText,
  Users,
  Package,
  Home,
  LogOut,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { useAuthStore } from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type View =
  | "home"
  | "services-catalog"
  | "certificate"
  | "device"
  | "documents"
  | "users"
  | "settings";

interface AppSidebarProps {
  onViewChange?: (view: View) => void;
  currentView?: View;
}

export function AppSidebar({ onViewChange, currentView }: AppSidebarProps) {
  const { instance } = useMsal();
  const { user, logout } = useAuthStore();
  const [isInventoryExpanded, setIsInventoryExpanded] = useState(true);

  const menuItems = [
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

  const inventorySubmenu = [
    {
      title: "Service Catalog",
      view: "services-catalog" as View,
    },
    {
      title: "Certificate",
      view: "certificate" as View,
    },
    {
      title: "Device",
      view: "device" as View,
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
              {/* Home Menu Item */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleMenuItemClick("home")}
                  isActive={currentView === "home"}
                  className={
                    currentView === "home"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white [&[data-active=true]]:bg-indigo-600 [&[data-active=true]]:text-white"
                      : "text-foreground"
                  }
                >
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Inventory with Submenu */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsInventoryExpanded(!isInventoryExpanded)}
                  isActive={[
                    "services-catalog",
                    "certificate",
                    "device",
                  ].includes(currentView || "")}
                  className={
                    ["services-catalog", "certificate", "device"].includes(
                      currentView || ""
                    )
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white [&[data-active=true]]:bg-indigo-600 [&[data-active=true]]:text-white"
                      : "text-foreground"
                  }
                >
                  <Package />
                  <span>Inventory</span>
                  <ChevronRight
                    className={`ml-auto size-4 transition-transform ${
                      isInventoryExpanded ? "rotate-90" : ""
                    }`}
                  />
                </SidebarMenuButton>
                {isInventoryExpanded && (
                  <SidebarMenuSub>
                    {inventorySubmenu.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          onClick={() => handleMenuItemClick(subItem.view)}
                          isActive={currentView === subItem.view}
                          className={
                            currentView === subItem.view
                              ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-800 [&[data-active=true]]:bg-indigo-100"
                              : ""
                          }
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* Other Menu Items */}
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleMenuItemClick(item.view)}
                    isActive={currentView === item.view}
                    className={
                      currentView === item.view
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white [&[data-active=true]]:bg-indigo-600 [&[data-active=true]]:text-white"
                        : ""
                    }
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
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto cursor-pointer focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-700 transition-all rounded-md !p-2">
                  <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-sm overflow-hidden">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || "Avatar"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] font-bold leading-none tracking-tight">
                        {getInitials(user?.name, user?.email)}
                      </span>
                    )}
                  </div>
                  <div className="grid flex-1 min-w-0 text-left text-xs leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      {user?.name || "User"}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      {user?.email || "No email"}
                    </span>
                  </div>
                  <div className="ml-auto flex flex-col items-center justify-center">
                    <ChevronUp className="size-3 text-muted-foreground" />
                    <ChevronDown className="size-3 text-muted-foreground" />
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
