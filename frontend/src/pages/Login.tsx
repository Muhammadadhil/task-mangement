import { signIn } from "@/api/auth";
import PasswordField from "@/components/passwordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginResponse {
    data: {
        user: {
            id: string;
            email: string;
            name?: string;
        };
        accessToken: string;
    };
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email) {
            toast.error("Please enter your email");
            return;
        }
        if (!formData.password) {
            toast.error("Please enter your password");
            return;
        }

        try {
            setIsLoading(true);
            const response = (await signIn(formData)) as LoginResponse;
            setIsLoading(false);

            // Use the context login function
            login({
                user: response.data.user,
                accessToken: response.data.accessToken,
            });

            navigate("/dashboard");
        } catch (error: unknown) {
            setIsLoading(false);
            console.log("login error:", error);

            // Type guard for error with response property
            if (error && typeof error === "object" && "response" in error) {
                const errorObj = error as { response?: { data?: { message?: string } } };
                toast.error(errorObj.response?.data?.message || "Login failed");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    // Rest of your component remains the same
    return (
        <div className="flex w-full h-screen min-h-screen bg-gradient-to-b from-green-50 dark:from-green-950 to-white dark:to-black items-center justify-center transition-colors duration-300">
            {isLoading ? (
                <div className="animate-spin h-5 w-5 border-b-2 border-blue-500"></div>
            ) : (
                <div className="w-[32rem] h-[38rem] lg:w-12/12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 flex items-center justify-center rounded-2xl shadow-md">
                    <div className="max-w-md w-full space-y-8 p-8">
                        <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">Sign in to your account</h2>

                        <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                            <div className="rounded-md shadow-sm space-y-2">
                                <Label htmlFor="email-address" className="text-gray-700 dark:text-gray-300">
                                    Email address
                                </Label>
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <PasswordField value={formData.password} onChange={handleInputChange} />

                            <div className="flex items-center justify-between">
                                <Label htmlFor="remember-me" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="mr-2 rounded border-gray-300 dark:border-gray-700 text-green-600 focus:ring-green-500" />
                                    Remember me
                                </Label>
                                <Link to="/forgot-password" className="text-xs text-orange-900 dark:text-orange-500 hover:text-orange-800 dark:hover:text-orange-400">
                                    Forgot your password?
                                </Link>
                            </div>

                            <Button type="submit" className="w-full bg-green-800 hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-800 text-white">
                                Sign in
                            </Button>
                        </form>

                        <div className="text-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-green-800 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400">
                                    Signup
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
