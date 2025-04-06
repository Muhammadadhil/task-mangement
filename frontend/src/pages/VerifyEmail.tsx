import { verifyEmailApi } from "@/api/auth";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerification: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await verifyEmailApi(token!);
                setStatus("success");
                setMessage("Email verified successfully!");
               
            } catch {
                setStatus("failed");
                setMessage("An error occurred while verifying your email. Please try again later.");
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setStatus("failed");
            setMessage("Invalid verification token.");
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-md rounded-2xl">
                <h1 className="text-2xl font-bold text-center mb-4">{status === "loading" ? "Verifying..." : status === "success" ? "Success!" : "Failed"}</h1>
                <p className="text-center text-gray-600">{message}</p>
                <div className="mt-4 flex justify-center">
                    <Link to="/">
                        <button className="bg-green-600 hover:bg-primary-700 text-gray-800 font-bold py-2 px-4 rounded">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
