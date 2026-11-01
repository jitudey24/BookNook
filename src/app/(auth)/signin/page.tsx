
"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { signIn, authClient } from "@/lib/auth-client";

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

import { Eye, EyeOff, BookOpen } from "lucide-react";

const SignInPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Email and password login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await signIn.email({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
        return;
      }

      // Verify the newly created session
      const sessionResult = await authClient.getSession();

      if (!sessionResult.data?.user) {
        toast.error("Login succeeded, but session could not be verified.");
        return;
      }

      toast.success("Login successful!");

      // Navigate to home after successful login
      router.replace("/");
      router.refresh();
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

        {/* Header */}
        <CardHeader className="space-y-3 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <BookOpen className="h-8 w-8" />
          </div>

          <CardTitle className="text-3xl font-bold">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Login to continue your BookNook journey.
          </CardDescription>

        </CardHeader>

        <CardContent>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">

              <Label htmlFor="email">
                Email Address
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>

            {/* Password */}
            <div className="space-y-2">

              <div className="flex items-center justify-between">

                <Label htmlFor="password">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative">

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="pr-12"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>

              </div>

            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || googleLoading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">

            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-500">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />

          </div>

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

            {googleLoading
              ? "Please wait..."
              : "Continue with Google"}

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
