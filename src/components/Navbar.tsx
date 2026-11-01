"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  BookOpen,
  Menu,
  Home,
  Library,
  Plus,
  BookMarked,
  Bookmark,
  LogOut,
  UserRound,
} from "lucide-react";

import { signOut, useSession } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;

  const navLinks = [
    { name: "Home", href: "/", icon: Home, private: false },
    { name: "All Books", href: "/all-books", icon: Library, private: false },
    { name: "Add Book", href: "/add-book", icon: Plus, private: true },
    { name: "My Books", href: "/my-books", icon: BookMarked, private: true },
    { name: "My Borrows", href: "/my-borrows", icon: Bookmark, private: true },
  ];

  const visibleLinks = navLinks.filter((link) => !link.private || user);

  // Logout handler
  const handleLogout = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        toast.error("Logout failed. Please try again.");
        return;
      }

      toast.success("Logged out successfully!");

      setMobileOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // Generate user initials
  const getInitials = (name?: string | null) =>
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  // Profile navigation
  const handleProfile = () => {
    router.push("/profile");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-6 w-6" />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Book<span className="text-primary">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {visibleLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPending ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            /* Logged In User Dropdown */
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full px-2 py-1 outline-none hover:bg-accent">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>

                <span className="max-w-28 truncate text-sm font-medium">
                  {user.name}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* User Information */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <span>{user.name}</span>

                      <span className="text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Profile */}
                <DropdownMenuItem onClick={handleProfile}>
                  <UserRound className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Logged Out Buttons */
            <>
              <Link
                href="/signin"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-5">
                {/* Mobile Logo */}
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-7 w-7 text-primary" />

                  <span className="text-xl font-bold">BookNook</span>
                </Link>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-2">
                  {visibleLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <Icon className="h-4 w-4" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t pt-4">
                  {isPending ? (
                    <p className="text-sm text-muted-foreground">Loading...</p>
                  ) : user ? (
                    /* Mobile Logged In User */
                    <div className="space-y-4">
                      {/* User Information */}
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={user.image || ""}
                            alt={user.name || "User"}
                          />

                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Profile Button */}
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={handleProfile}
                      >
                        <UserRound className="mr-2 h-4 w-4" />
                        My Profile
                      </Button>

                      {/* Logout Button */}
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    /* Mobile Logged Out User */
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/signin"
                        onClick={closeMobileMenu}
                        className="inline-flex h-10 w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        Login
                      </Link>

                      <Link
                        href="/signup"
                        onClick={closeMobileMenu}
                        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
