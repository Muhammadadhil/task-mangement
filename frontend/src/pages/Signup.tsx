import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordField from "@/components/passwordField";
import { signUp } from "@/api/auth";

interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: string;
}

interface SignupResponse {
    data: {
        user: {
            id: string;
            email: string;
            name: string;
            userType: string;
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
        userType: "user",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

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

    useEffect(()=>{
            if(isAuthenticated){
                navigate('/dashboard');
            }
        },[isAuthenticated,navigate])

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            const { confirmPassword, ...signupData } = formData;
            console.log(confirmPassword);
            (await signUp(signupData)) as SignupResponse;
            setIsLoading(false);

            toast.success("Account created successfully , Verify your email by checking your mail");
            navigate("/login");
            
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
        <div className="flex w-full h-screen bg-gray-50">
            {isLoading ? (
                <div className="animate-spin h-5 w-5 border-b-2 border-lime-400 m-auto"></div>
            ) : (
                <div className="w-full max-w-[1200px] h-full mx-auto flex items-center justify-between p-8">
                    <div className="w-[440px]">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Create your account</h1>

                        <form onSubmit={handleSignupSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm text-gray-600">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full h-12 bg-white border border-gray-200 rounded-lg px-4"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm text-gray-600">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-12 bg-white border border-gray-200 rounded-lg px-4"
                                    placeholder="johndoe@gmail.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <PasswordField
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    name="password"
                                    placeholder="Create a password"
                                />
                            </div>

                            <div className="space-y-2">
                                <PasswordField
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <Button type="submit" className="w-full h-12 bg-lime-400 hover:bg-lime-500 text-white rounded-lg font-medium">
                                Create Account
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="text-lime-500 hover:text-lime-600">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="flex-1 flex justify-center items-center">
                        <img src="../assets/videoframe_2125.png" alt="Decorative cube illustration" className=" w-[600px] h-auto" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignupPage;
