import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, Mail, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/staff');
    }
  }, [user, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      
      toast.success('Login successful!');
      
      // Navigation will be handled by the useEffect above
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
      {/* Decorative circles */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="mx-4 overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-foreground">Login</h1>
                <p className="text-muted-foreground">Welcome back! Please login to your account</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      {...register('password')}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>

              <div className="mt-8 rounded-lg bg-muted p-4">
                <p className="mb-2 text-sm font-medium text-foreground">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Admin:</strong> admin@suvidha.com / admin123</p>
                  <p><strong>Staff:</strong> staff@suvidha.com / staff123</p>
                </div>
              </div>
            </div>

            {/* Illustration Section */}
            <div className="hidden bg-gradient-to-br from-primary to-primary-hover p-12 md:flex md:items-center md:justify-center">
              <div className="relative">
                {/* Laptop illustration using CSS */}
                <div className="relative mx-auto h-48 w-64">
                  {/* Laptop screen */}
                  <div className="absolute inset-0 rounded-t-lg border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                    <div className="absolute inset-4 rounded bg-primary-hover/50" />
                  </div>
                  
                  {/* Laptop base */}
                  <div className="absolute -bottom-2 left-1/2 h-2 w-72 -translate-x-1/2 rounded-b-lg bg-white/30" />
                  
                  {/* Decorative plant */}
                  <div className="absolute -right-16 top-20 h-24 w-16">
                    <div className="h-full w-full rounded-t-full bg-green-400/30" />
                    <div className="mx-auto h-8 w-4 bg-white/20" />
                  </div>
                  
                  {/* Decorative coffee cup */}
                  <div className="absolute -left-12 top-24 h-16 w-12">
                    <div className="h-12 w-12 rounded-b-full border-4 border-white/30 bg-red-400/30" />
                    <div className="absolute -right-2 top-4 h-6 w-8 rounded-r-full border-4 border-l-0 border-white/30" />
                  </div>
                </div>

                <div className="mt-16 text-center">
                  <h2 className="text-2xl font-bold text-white">Suvidha POS</h2>
                  <p className="mt-2 text-white/80">Manage your business with ease</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
