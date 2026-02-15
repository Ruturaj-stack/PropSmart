import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (form.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create Auth User
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      // 2️⃣ Insert into profiles table
      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: form.name,
          });


        if (profileError) throw profileError;
      }

      toast({
        title: "Registration Successful 🎉",
        description: "Account created successfully!",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 items-center justify-center bg-primary lg:flex">
        <div className="max-w-md px-12">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-2xl font-bold text-primary-foreground"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Home className="h-5 w-5 text-accent-foreground" />
            </div>
            PropSmart
          </Link>
          <h2 className="mt-8 font-display text-3xl font-bold text-primary-foreground">
            Join PropSmart
          </h2>
          <p className="mt-3 text-primary-foreground/60">
            Create your account to get intelligent property recommendations.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <Input
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground"
              size="lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
