"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";

import {
  IconHelp,
  IconBook,
  IconUser,
  IconBell,
  IconBook2,
  IconPaperBag,
  IconCalendar,
  IconBriefcase,
  IconStars,
} from "@tabler/icons-react";

const data = {
  user: {
    name: "fikir",
    email: "fikeryilkaltages@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Profile",
      url: "/tutors/dashboard/profile",
      icon: IconUser,
    },
    {
      title: "My Subjects",
      url: "/tutors/dashboard/my-subjects",
      icon: IconBook2,
    },
    {
      title: "My Applications",
      url: "/tutors/dashboard/my-applications",
      icon: IconPaperBag,
    },
    {
      title: "Availability",
      url: "/tutors/dashboard/availability",
      icon: IconCalendar,
    },
    {
      title: "My Jobs",
      url: "/tutors/dashboard/my-jobs",
      icon: IconBriefcase,
    },
    {
      title: "Reviews",
      url: "/tutors/dashboard/reviews",
      icon: IconStars,
    },
  ],
  navSecondary: [
    {
      title: "Get Help",
      url: "/tutors/dashboard/get-help",
      icon: IconHelp,
    },
    {
      title: "Notifications",
      url: "/tutors/dashboard/notifications",
      icon: IconBell,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconBook className="!size-5" />
                <span className="text-base font-semibold">Tutor Bridge </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
