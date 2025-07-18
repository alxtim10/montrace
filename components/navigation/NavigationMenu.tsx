"use client";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { forwardRef, useEffect, useState } from "react";

export function NavigationMenuDemo() {
  const router = useRouter();
  const [token, setToken] = useState<string>();
  const { toast } = useToast();
  const handleLogout = async () => {
    Swal.fire({
      title: "Confirmation",
      text: "Log out of montrac.e?",
      icon: "info",
      confirmButtonText: "Log out",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const logout = async () => {
    await fetch("/api/logout?token=" + token, {
      method: "POST"
    });
    localStorage.removeItem("dompetToken");
    toast({
      title: "Success",
      description: "Logout Successful",
    });

    logoutRedirect();
  };

  const logoutRedirect = () => {
    router.push("/");
  };

  const dashboardRedirect = (page: String) => {
    router.push("/tracker/" + page);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      let refreshToken = localStorage.getItem("dompetToken");
      if (refreshToken) {
        setToken(refreshToken);
      }
    }
  }, [])

  return (
    <section className="flex justify-center items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tracker</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <ListItem onClick={() => dashboardRedirect("")} title="Tracker">
                  Track your expenses and savings.
                </ListItem>
                <ListItem
                  onClick={() => dashboardRedirect("timeline")}
                  title="Timeline"
                >
                  View your saving and expense timeline.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem
                  onClick={() => dashboardRedirect("profile")}
                  title="Profile"
                >
                  Edit your profile.
                </ListItem>
                <ListItem onClick={handleLogout} title="Log Out">
                  Log out your account.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="opacity-80 hover:opacity-100 transition-all cursor-pointer">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
