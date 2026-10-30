"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { signIn } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiGoogle } from "@icons-pack/react-simple-icons";

const SignInPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Email and password login
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
        return;
      }

      if (data) {
        toast.success("Login successful!");

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>

          <CardDescription>
            Sign in to continue your BookNook journey.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || googleLoading}
            >
              {loading ? "Logging in..." : "Sign in"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-500">OR</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google Login */}
          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.6 6.1-14.7Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.5-5c-1.8 1.2-4.1 1.9-7 1.9-5.3 0-9.8-3.6-11.4-8.4H5.9v5.2C9.3 39.5 16.1 44 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.2H5.9a20 20 0 0 0 0 17.8l6.7-5.2Z"
              />
              <path
                fill="#EA4335"
                d="M24 12.3c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.2 29.5 4 24 4 16.1 4 9.3 8.5 5.9 15.1l6.7 5.2c1.6-4.8 6.1-8 11.4-8Z"
              />
            </svg>

            {googleLoading ? "Please wait..." : "Continue with Google"}
          </Button>

          {/* Register Link */}
          <p className="mt-5 text-center text-sm text-gray-500">
            Don`t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignInPage;
