import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);
    

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });

    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 items-center justify-center bg-primary lg:flex">
        <div className="max-w-md px-12">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-primary-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Home className="h-5 w-5 text-accent-foreground" />
            </div>
            PropSmart
          </Link>
          <h2 className="mt-8 font-display text-3xl font-bold text-primary-foreground">Welcome back</h2>
          <p className="mt-3 text-primary-foreground/60">Sign in to access personalized property recommendations and saved favorites.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 font-display text-xl font-bold text-foreground lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Home className="h-4 w-4 text-accent-foreground" />
            </div>
            PropSmart
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground">Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-accent hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
