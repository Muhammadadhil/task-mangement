import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordField from "@/components/passwordField";
import { signUp } from "@/api/auth";
import dreampc from "../../public/assets/dreampcc.jpeg";
import { RainbowButton } from "@/components/magicui/rainbow-button";


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
    const { isAuthenticated } = useAuth();

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
        <div className="flex h-screen w-full overflow-hidden">
            {/* Left side - Dark background with branding */}
            <div className="hidden md:flex md:w-1/2 bg-black text-white flex-col relative">
                {/* Logo/Brand at top */}
                <div className="absolute top-0 left-0 p-8 z-10">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">TaskFlow</span>
                    </Link>
                </div>

                {/* Full-height image with overlay */}
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-black/50 z-[1]"></div>
                    <img src={dreampc || "/placeholder.svg"} alt="Workspace" className="w-full h-full object-cover" />
                </div>

                {/* Motivation Text at bottom */}
                <div className="absolute bottom-0 left-0 p-8 z-10">
                    <h2 className="text-lg font-semibold text-white">Stay focused. Stay organized.</h2>
                    <p className="mt-2 text-sm text-gray-400">Manage your tasks efficiently and boost your productivity with TaskFlow Tasks.</p>
                </div>
            </div>

            {/* Right side - Signup form */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
                {isLoading ? (
                    <div className="animate-spin h-8 w-8 border-b-2 border-lime-400 rounded-full"></div>
                ) : (
                    <div className="w-full max-w-md">
                        {/* Mobile-only logo */}
                        <div className="md:hidden mb-8">
                            <Link to="/" className="flex items-center space-x-2">
                                <span className="text-xl font-bold">TaskFlow</span>
                            </Link>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
                            <p className="text-gray-600 mt-2">Start managing your tasks effortlessly</p>
                        </div>

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
                                <PasswordField value={formData.password} onChange={handleInputChange} name="password" placeholder="Create a password" />
                            </div>

                            <div className="space-y-2">
                                <PasswordField value={formData.confirmPassword} onChange={handleInputChange} name="confirmPassword" placeholder="Confirm your password" />
                            </div>

                            <RainbowButton type="submit" className="w-full h-12">
                                Create Account
                            </RainbowButton>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or</span>
                                </div>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="text-gray-800 font-medium hover:underline">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {/* Mobile-only image at bottom */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-32 z-[-1]">
                <img src={dreampc || "/placeholder.svg"} alt="Workspace" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
        </div>
    );

};

export default SignupPage;
