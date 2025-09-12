"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import Link from "next/link";

import {
  IconUser,
  IconBook2,
  IconPaperBag,
  IconBriefcase,
  IconStars,
  IconUsersGroup,
  IconQuestionMark,
  IconBell,
  IconVersionsFilled,
} from "@tabler/icons-react";

const data = {
  navMain: [
    {
      title: "menu",
      url: "/admin",
      icon: IconUser,
    },
    {
      title: "Tutors",
      url: "/admin/tutors",
      icon: IconUser,
    },
    {
      title: "Families",
      url: "/admin/families",
      icon: IconUsersGroup,
    },
    {
      title: "Tutor Requests",
      url: "/admin/requests",
      icon: IconQuestionMark,
    },
    {
      title: "Unverifyeds",
      url: "/admin/unverifyeds",
      icon: IconVersionsFilled,
    },
    {
      title: "Banned",
      url: "/admin/banned",
      icon: IconVersionsFilled,
    },
    {
      title: "Jobs",
      url: "/admin/jobs",
      icon: IconBriefcase,
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: IconStars,
    },
    {
      title: "Subjects",
      url: "/admin/subjects",
      icon: IconBook2,
    },
    {
      title: "write a notification",
      url: "/admin/notifications",
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
              <Link href="/">
                <span className="text-base font-semibold">Tutor Bridges </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
