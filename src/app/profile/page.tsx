
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  UserRound,
  Mail,
  LogOut,
  Save,
} from "lucide-react";

import {
  updateUser,
  signOut,
  useSession,
} from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Generate user initials
  const getInitials = (value?: string | null) => {
    return (
      value
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );
  };

  // Update user name
  const handleUpdateName = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const updatedName = (name ?? user?.name ?? "").trim();

    if (!updatedName) {
      toast.error("Name cannot be empty!");
      return;
    }

    if (updatedName === user?.name) {
      toast.error("No changes detected!");
      return;
    }

    try {
      setLoading(true);

      const { error } = await updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "Failed to update name!");
        return;
      }

      setName(updatedName);

      toast.success("Name updated successfully!");

      router.refresh();
    } catch (error) {
      console.error("Update name error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "Logout failed!");
        return;
      }

      toast.success("Logged out successfully!");

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-muted-foreground">
          Loading profile...
        </p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4">
        <UserRound className="h-12 w-12 text-muted-foreground" />

        <h2 className="text-xl font-semibold">
          Please login first
        </h2>

        <Button onClick={() => router.push("/signin")}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-2xl">

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            My Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your BookNook account information.
          </p>
        </div>

        <Card>
          {/* Profile Header */}
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user.image || ""}
                alt={user.name || "User"}
              />

              <AvatarFallback className="text-2xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <CardTitle className="mt-3 text-2xl">
              {user.name}
            </CardTitle>

            <CardDescription>
              BookNook Member
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Account Information */}
            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-semibold">
                Account Information
              </h3>

              {/* Name */}
              <div className="flex items-center gap-3">
                <UserRound className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Name
                  </p>

                  <p className="font-medium">
                    {user.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="font-medium">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Update Name Form */}
            <form
              onSubmit={handleUpdateName}
              className="space-y-4"
            >
              <div>
                <h3 className="mb-1 font-semibold">
                  Update Your Name
                </h3>

                <p className="text-sm text-muted-foreground">
                  Change the name displayed on your profile.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name
                </Label>

                <Input
                  id="name"
                  type="text"
                  value={name ?? user.name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                <Save className="mr-2 h-4 w-4" />

                {loading ? "Updating..." : "Update Name"}
              </Button>
            </form>

            {/* Sign Out */}
            <div className="border-t pt-5">
              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                <LogOut className="mr-2 h-4 w-4" />

                {logoutLoading
                  ? "Signing Out..."
                  : "Sign Out"}
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ProfilePage;
