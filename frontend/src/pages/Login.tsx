import { signIn } from "@/api/auth";
import PasswordField from "@/components/passwordField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import dreampc from "../../public/assets/dreampcc.jpeg";
import { RainbowButton } from "@/components/magicui/rainbow-button";

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
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

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
            console.log("response", response);
            setIsLoading(false);

            login({
                user: response.data.user,
                accessToken: response.data.accessToken,
            });
        } catch (error: unknown) {
            setIsLoading(false);
            if (error && typeof error === "object" && "response" in error) {
                const errorObj = error as { response?: { data?: { message?: string } } };
                toast.error(errorObj.response?.data?.message || "Login failed");
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

                {/* Quote at bottom */}
                <div className="absolute bottom-0 left-0 p-8 z-10">
                    <h2 className="text-lg font-semibold text-white">Stay focused. Stay organized.</h2>
                    <p className="mt-2 text-sm text-gray-400">Manage your tasks efficiently and boost your productivity with TaskFlow Tasks.</p>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
                {isLoading ? (
                    <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <div className="w-full max-w-md">
                        {/* Mobile-only logo */}
                        <div className="md:hidden mb-8">
                            <Link to="/" className="flex items-center space-x-2">
                                <span className="text-xl font-bold">TaskFlow</span>
                            </Link>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Welcome to TaskFlow</h1>
                            <p className="text-gray-600 mt-2">Please sign in to continue</p>
                        </div>

                        <form onSubmit={handleLoginSubmit} className="space-y-6">
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
                                <PasswordField value={formData.password} onChange={handleInputChange} />
                            </div>

                            <div className="pt-2">
                                <RainbowButton type="submit" className="w-full h-12">
                                    Log in
                                </RainbowButton>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or</span>
                                </div>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-gray-800 font-medium hover:underline">
                                    Sign up
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

export default LoginPage;
