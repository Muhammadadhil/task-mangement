import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordField from "@/components/passwordField";
import { signUp } from "@/api/auth"; // Assuming you have this function

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: string; // Assuming you're collecting user type based on your routing
}

interface SignupResponse {
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            userType: string;
            // Add other user properties
        };
        accessToken: string;
    };
}

const SignupPage: React.FC = () => {

    const [formData, setFormData] = useState<SignupFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "user", // Default user type, adjust as needed
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

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            toast.error("Please enter your name");
            return false;
        }

        if (!formData.email) {
            toast.error("Please enter your email");
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (!formData.password) {
            toast.error("Please enter a password");
            return false;
        }

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            // Omit confirmPassword from the API call
            const { confirmPassword, ...signupData } = formData;
            console.log("confirmPassword:", confirmPassword);

            const response = (await signUp(signupData)) as SignupResponse;
            setIsLoading(false);

            // Use the context login function
            login({
                user: response.data.user,
                accessToken: response.data.accessToken,
            });

            toast.success("Account created successfully!");
            navigate("/dashboard");
        } catch (error: unknown) {
            setIsLoading(false);

            if (error && typeof error === "object" && "response" in error) {
                const errorObj = error as { response?: { data?: { message?: string } } };
                toast.error(errorObj.response?.data?.message || "Signup failed");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="flex w-full h-screen min-h-screen bg-gradient-to-b from-green-50 dark:from-green-950 to-white dark:to-black items-center justify-center transition-colors duration-300">
            {isLoading ? (
                <div className="animate-spin h-5 w-5 border-b-2 border-blue-500"></div>
            ) : (
                <div className="w-[32rem] h-[42rem] lg:w-12/12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 flex items-center justify-center rounded-2xl shadow-md">
                    <div className="max-w-md w-full space-y-6 p-8">
                        <h2 className="mt-4 text-center text-2xl font-semibold text-gray-900 dark:text-white">Create your account</h2>

                        <form className="mt-6 space-y-5" onSubmit={handleSignupSubmit}>
                            <div className="rounded-md shadow-sm space-y-2">
                                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                    placeholder="Enter your full name"
                                />
                            </div>

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

                            <PasswordField value={formData.password} onChange={handleInputChange} name="password" label="Password" placeholder="Create a password" />

                            <PasswordField value={formData.confirmPassword} onChange={handleInputChange} name="confirmPassword" label="Confirm Password" placeholder="Confirm your password" />

                            <Button type="submit" className="w-full bg-green-800 hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-800 text-white">
                                Create Account
                            </Button>
                        </form>

                        <div className="text-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login" className="text-green-800 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400">
                                    Sign in
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignupPage;
