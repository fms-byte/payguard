"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/api/auth/action";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignOut = async () => {
    await logout();
    setIsLoggedIn(false);
    router.push("/");
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  useEffect(() => {
    async function getSession() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    }
    getSession();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href={isLoggedIn ? "/dashboard" : "/"}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold text-primary">PayGuard</span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            <nav className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className={`text-md font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith("/dashboard")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/payments"
                className={`text-md font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith("/payments")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Payments
              </Link>
            </nav>
          </div>
        </div>

        {isLoggedIn && (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserIcon className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goToProfile}>
                  Profile
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
