import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpenText, School2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { registerAction } from "@/store/auth/authSlice";
import { RegisterData } from "@/types/AuthTypes";

// ✅ Zod Schema for Validation
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[!@#$%^&*]/, "Must contain at least one special character"),
  role: z.enum(["STUDENT", "COLLEGE_ADMIN"]),
  terms: z.boolean().refine((v) => v, { message: "You must agree to the terms" }),
});




const Register = () => {
  const [selectedRole, setSelectedRole] = useState("STUDENT" as RegisterData["role"]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "STUDENT",
      terms: false,
    },
  });

    const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)
  

  //  Handle Role Selection
  const handleRoleChange = (role: RegisterData["role"]) => {
    setSelectedRole(role || "STUDENT");
    setValue("role", role);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ✅ Form Submission
  const onSubmit = async (data: RegisterData) => {
    try {
      await dispatch(registerAction({ data, navigate })).unwrap();
      toast.success("Registration successful!");
    } catch (error: Error | any) {
      console.error(error);
      toast.error(error?.message);
    }
  };
  

  const RoleButton = ({role, icon: Icon, children}: {role: RegisterData["role"], icon: React.ElementType, children: React.ReactNode}) => {
    return (
      <label
      className={cn(
          "flex items-center justify-center px-3 py-2 w-full border rounded-lg cursor-pointer transition-all",
          "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700",
          selectedRole === role
              ? "border-indigo-500 bg-indigo-100 dark:border-indigo-400 dark:bg-indigo-900/30"
              : "peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:border-indigo-400 dark:peer-checked:bg-indigo-900/20"
      )}
      onClick={() => handleRoleChange(role)}
  >
      <Icon size={17} strokeWidth={1.5} className="mr-2"/>
      {children}
  </label>
  
    );
}

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
    <Card className="w-screen max-w-md bg-muted dark:bg-muted/20 text-foreground shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-center">Create an Account</CardTitle>
          <p className="text-sm text-center text-muted-foreground">
            Join and find your perfect college match
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register("email")} placeholder="Email" required disabled={loading}/>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} placeholder="••••••••" required disabled={loading}/>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <Label>I am a</Label>
              <div className="flex max-w-full space-x-2">
                <RoleButton role="STUDENT" icon={BookOpenText}>Student</RoleButton>
                <RoleButton role="COLLEGE_ADMIN" icon={School2Icon}>College Admin</RoleButton>
              </div>
              {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={watch("terms")} onCheckedChange={(value) => setValue("terms", value)} />

              <Label htmlFor="terms" className="text-sm">
                I agree to the <span className="text-primary">Terms</span> and{" "}
                <span className="text-primary">Privacy Policy</span>
              </Label>
            </div>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          {/* Sign-in Link */}
          <p className="mt-4 text-sm text-center">
            Already have an account? <Link to={'/auth/login'} className="text-primary">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
await new Promise((resolve) => setTimeout(resolve, 2000));

export default Register;
