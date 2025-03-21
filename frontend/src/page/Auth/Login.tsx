import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader2 } from "lucide-react";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { loginAction } from "@/store/auth/authSlice";



const LoginWith = ({ icon: Icon, to }: { icon: any, to: string }) => {
    return (
        <Link to={to} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
            <Icon size={20} />
        </Link>
    );
}

interface LoginForm {
    email: string;
    password: string;
    remember?: boolean;
}

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({ 
        defaultValues: {
            email: "",
            password: "",
            remember: false,
          },
     });
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)

        const dispatch = useAppDispatch();
        const navigate = useNavigate();

    const onSubmit = async (data:LoginForm) => {
        dispatch(loginAction({ data, navigate })).unwrap();
    };

    return (
        <div className="flex items-center justify-center min-h-screen  p-4">
            <Card className="w-screen max-w-md bg-muted dark:bg-muted/20 text-foreground shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome Back</CardTitle>
                    <p className="text-sm text-muted-foreground">Sign in to your account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input type="email" placeholder="your@email.com" {...register("email")} required disabled={loading}/>

                        <Input type="password" placeholder="Password" {...register("password")} required  disabled={loading}/>

                        <div className="flex space-x-2 items-center justify-between">
                            <div>
                            <Checkbox {...register("remember")} id="remember" className="mr-3"/>
                            <Label htmlFor="remember" className="text-foreground">Remember me</Label>
                            </div>
                            <Link to="/auth/forgot-password" className="text-primary">Forgot Password?</Link>
                        </div>

                        <Button type="submit" className="w-full">{loading ? <Loader2 className="animate-spin" /> : "Sign In"}</Button>
                    </form>

                    <div className="my-5 flex items-center justify-between text-sm">
                        <div className="border-b w-32"></div>
                        <span className="mx-1">Or continue with</span>
                        <div className="border-b w-32"></div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <LoginWith icon={Mail} to="/auth/login" />
                        <LoginWith icon={TwitterLogoIcon} to="/auth/login" />
                    </div>

                    <p className="mt-4 text-sm text-center">
                        Don't have an account? <Link to='/auth/register' className="text-primary">Sign up</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}