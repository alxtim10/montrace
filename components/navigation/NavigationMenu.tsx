"use client";

import * as React from "react";
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
import { useLogout } from "@/features/account/useLogout";
import { useToast } from "../ui/use-toast";

export function NavigationMenuDemo() {
  const router = useRouter();
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
        logoutUser();
      }
    });
  };

  const logoutRedirect = () => {
    router.push("/");
  };
  const { mutate: logoutUser } = useLogout({
    onError: (error: any) => {},
    onSuccess: (res: any) => {
      toast({
        title: res,
        description: "Logout Successfully",
      });

      setTimeout(logoutRedirect, 1200);
    },
  });

  const dashboardRedirect = (page: String) => {
    router.push("/tracker/" + page);
  };

  return (
    <section className="flex justify-center items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem
                  onClick={() => dashboardRedirect("timeline")}
                  title="Timeline"
                >
                  View your saving and expense timeline.
                </ListItem>
                <ListItem title="Profile">Edit your profile.</ListItem>
                <ListItem title="About Us">Yeah about us.</ListItem>
                <ListItem onClick={handleLogout} title="Log Out">
                  Log out your account.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tracker</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <ListItem onClick={() => dashboardRedirect("")} title="Tracker">
                  Track your expenses and savings.
                </ListItem>
                <ListItem title="Expense & Saving Data">
                  See your expenses and savings data.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
}

const ListItem = React.forwardRef<
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
