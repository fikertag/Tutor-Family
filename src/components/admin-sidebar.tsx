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
import { NavUser } from "@/components/nav-user";

import {
  IconBook,
  IconUser,
  IconBook2,
  IconPaperBag,
  IconBriefcase,
  IconStars,
  IconUsersGroup,
  IconQuestionMark,
} from "@tabler/icons-react";

const data = {
  user: {
    name: "fikir",
    email: "fikeryilkaltages@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tutors",
      url: "/tutors/dashboard/tutors",
      icon: IconUser,
    },
    {
      title: "Families",
      url: "/tutors/dashboard/families",
      icon: IconUsersGroup,
    },
    {
      title: "Tutor Requests",
      url: "/tutors/dashboard/reviews",
      icon: IconQuestionMark,
    },
    {
      title: "Applications",
      url: "/tutors/dashboard/applications",
      icon: IconPaperBag,
    },
    {
      title: "Jobs",
      url: "/tutors/dashboard/my-jobs",
      icon: IconBriefcase,
    },
    {
      title: "Reviews",
      url: "/tutors/dashboard/reviews",
      icon: IconStars,
    },
    {
      title: "Subjects",
      url: "/tutors/dashboard/subjects",
      icon: IconBook2,
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
