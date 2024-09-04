'use client';

import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LockIcon, LogOutIcon, UserIcon } from "lucide-react";
import { logout } from "@/auth/actions";
import Link from "next/link";


export default function UserButton({}) {
  const session = useSession()
  
  if (session.status === "loading") {
    return(
      <div className="bg-muted animate-pulse size-10 rounded-full" />
    )
  }


  const user = session?.data?.user;

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 min-w-52 rounded-lg">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
  
          <DropdownMenuItem className="h-10 px-4 rounded-lg font-medium cursor-pointer space-x-2">
            <UserIcon size={16} /> <span>Profile</span>
          </DropdownMenuItem>
  
          {user.role === "admin" && (
            <Link href={"/admin"}>
              <DropdownMenuItem className="h-10 px-4 rounded-lg font-medium cursor-pointer space-x-2">
                <LockIcon size={16} /> <span>Admin</span>
              </DropdownMenuItem>
            </Link>
          )}
          <button onClick={() => {logout()}} className="h-10 px-4 flex w-full text-sm items-center rounded-lg text-destructive hover:bg-destructive/10 font-medium cursor-pointer space-x-2">
            <LogOutIcon size={16} /> <span>Logout</span>
          </button>
  
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
}