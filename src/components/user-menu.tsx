import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTutorBasicProfile } from "@/hooks/useTutors";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/user_store";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { data: tutor } = useTutorBasicProfile();
  const { logout } = useUserStore();
  const router = useRouter();

  if (!tutor) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-accent-foreground hover:cursor-pointer ">
          <AvatarImage src="./avatar.jpg" alt="Profile image" />
          <AvatarFallback>
            {tutor?.first_name?.charAt(0) ||
              (tutor?.email ? tutor?.email.charAt(0) : "P")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {tutor?.first_name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {tutor?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
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
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
