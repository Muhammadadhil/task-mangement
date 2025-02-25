// components/passwordField.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    label?: string;
    placeholder?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, name = "password", label = "Password", placeholder = "Enter your password" }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="rounded-md shadow-sm space-y-2">
            <Label htmlFor={name} className="text-gray-700 dark:text-gray-300">
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white pr-10"
                    placeholder={placeholder}
                />
                <button type="button" className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500" onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );
};

export default PasswordField;
