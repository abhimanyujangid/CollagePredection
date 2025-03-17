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
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ✅ Zod Schema for Validation
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[!@#$%^&*]/, "Must contain at least one special character"),
  role: z.enum(["Student", "College Admin"]),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "Student" | "College Admin";    // ✅ Role Type
  terms: boolean;
}



const Register = () => {
  const [selectedRole, setSelectedRole] = useState("Student");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "Student",
      terms: false,
    },
  });

  //  Handle Role Selection
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  // ✅ Form Submission
  const onSubmit = (data: RegisterForm) => {
    console.log("Form Submitted:", data);
  };

  const RoleButton = ({role, icon: Icon, children}: {role: RegisterForm["role"], icon: React.ElementType, children: React.ReactNode}) => {
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
      <Card className="w-full max-w-md  bg-muted dark:bg-muted/20 text-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Create an Account</CardTitle>
          <p className="text-sm text-center text-muted-foreground">
            Join and find your perfect college match
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} placeholder="First Name" className="border " />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} placeholder="Last Name" />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register("email")} placeholder="Email" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <Label>I am a</Label>
              <div className="flex max-w-full space-x-2">
                <RoleButton role="Student" icon={BookOpenText}>Student</RoleButton>
                <RoleButton role="College Admin" icon={School2Icon}>College Admin</RoleButton>
              </div>
              {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" {...register("terms")} />
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
