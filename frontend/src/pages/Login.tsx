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
    const { login,isAuthenticated } = useAuth();

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/dashboard');
        }
    },[isAuthenticated,navigate])



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
            console.log('response',response)
            setIsLoading(false);

            login({
                user: response.data.user,
                accessToken: response.data.accessToken,
            });

            console.log("navigatedd!!");

        } catch (error: unknown) {
            setIsLoading(false);
            console.log("login error:", error);

            if (error && typeof error === "object" && "response" in error) {
                const errorObj = error as { response?: { data?: { message?: string } } };
                toast.error(errorObj.response?.data?.message || "Login failed");
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
                <div className="w-full h-full mx-auto flex items-center justify-between gap-28">
                    <div className=" w-[500px] p-8 mx-auto ">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Welcome to Taskify</h1>

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

                            <RainbowButton type="submit" className="w-full h-12">
                                Log in
                            </RainbowButton>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-gray-800 hover:text-gray-700">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="fw-full h-screen lex-1 flex justify-end items-center flex-wrap">
                        <img src={dreampc} alt="image" className="w-full h-full object-cover" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
