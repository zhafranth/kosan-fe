import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAccount } from "@/api/auth";

// Skema validasi untuk form login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi" })
    .email({ message: "Format email tidak valid" }),
  password: z
    .string()
    .min(6, { message: "Password minimal 6 karakter" })
    .max(50, { message: "Password maksimal 50 karakter" }),
});

// Tipe untuk data form
type LoginFormValues = z.infer<typeof loginSchema>;

const Auth = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (data: object) => loginAccount(data),
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token);
      // toast.success("Login berhasil");
    },
    onError: (error) => {
      console.log("error", error);
      // toast.error("Login gagal");
    },
  });

  // Setup react-hook-form dengan validasi zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handler untuk submit form
  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/dashboard");
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background dengan efek glassmorphism */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070')] bg-cover bg-center opacity-5" />
      </div>

      {/* Blur circles untuk efek glassmorphism */}
      <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Login Form */}
      <div
        className={cn(
          "w-full max-w-md p-8 rounded-2xl z-10",
          "bg-background/30 backdrop-blur-md border border-border/50",
          "shadow-lg shadow-blue-500/5 transition-all duration-700",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">KosanApp</h1>
          <p className="text-muted-foreground mt-2">Masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div
              className={cn(
                "flex items-center",
                "bg-background/50 backdrop-blur-sm border rounded-lg",
                "p-2 transition-all duration-300",
                errors.email
                  ? "border-red-400/50 ring-1 ring-red-400/30"
                  : "border-border/50 focus-within:border-blue-400/50 focus-within:ring-1 focus-within:ring-blue-400/30"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "h-5 w-5 mx-2",
                  errors.email ? "text-red-400" : "text-muted-foreground"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                className="flex-1 bg-transparent border-none focus:outline-none px-2 py-1"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div
              className={cn(
                "flex items-center",
                "bg-background/50 backdrop-blur-sm border rounded-lg",
                "p-2 transition-all duration-300",
                errors.password
                  ? "border-red-400/50 ring-1 ring-red-400/30"
                  : "border-border/50 focus-within:border-blue-400/50 focus-within:ring-1 focus-within:ring-blue-400/30"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "h-5 w-5 mx-2",
                  errors.password ? "text-red-400" : "text-muted-foreground"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="flex-1 bg-transparent border-none focus:outline-none px-2 py-1"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <a
              href="#"
              className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
            >
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            className={cn(
              "w-full py-2 px-4 rounded-lg font-medium mt-6",
              "bg-blue-500 text-white transition-all duration-300",
              "hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            )}
          >
            Masuk
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2023 KosanApp. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
