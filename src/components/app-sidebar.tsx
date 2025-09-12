"use client";

import * as React from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";

import {
  IconHelp,
  IconUser,
  IconBell,
  IconPaperBag,
  IconStars,
} from "@tabler/icons-react";

const data = {
  navMain: [
    {
      title: "Profile",
      url: "/tutors/dashboard",
      icon: IconUser,
    },
    {
      title: "My Applications",
      url: "/tutors/dashboard/my-applications",
      icon: IconPaperBag,
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
      <SidebarContent className="mt-12">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
