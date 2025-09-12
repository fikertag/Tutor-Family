"use client";

import { IconDotsVertical, IconLogout } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/user_store";
import { useRouter } from "next/navigation";
import { useTutorBasicProfile } from "@/hooks/useTutors";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: userprofile } = useTutorBasicProfile();
  const { logout } = useUserStore();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={userprofile?.profile_picture_url || ""}
                  alt={userprofile?.first_name || ""}
                />
                <AvatarFallback className="rounded-lg">
                  {userprofile?.first_name || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {userprofile?.first_name
                    ? userprofile?.first_name + userprofile?.last_name
                    : "Name"}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {userprofile?.email || "email"}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg text-destructive"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem>
              <span
                className="flex items-center gap-2 w-full"
                onClick={() => {
                  if (window.confirm("Are you sure you want to log out?")) {
                    authClient.signOut();
                    logout();
                    router.push("/auth/login");
                  }
                }}
              >
                <IconLogout size={16} aria-hidden="true" />
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
