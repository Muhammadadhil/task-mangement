import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, LayoutDashboard, Calendar, Users, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoolMode } from "./magicui/cool-mode";
import { ShimmerButton } from "./magicui/shimmer-button";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
            {/* Main Header */}
            <div className="container mx-auto">
                <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Left side: Logo and Navigation */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">TaskFlow</span>
                        </Link>
                    </div>

                    {/* Right side: Auth buttons */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <CoolMode>
                                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Log in
                                </Link>
                            </CoolMode>
                            <Link to="/signup">
                                <ShimmerButton className="h-10">Sign up</ShimmerButton>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        <div className="mt-4 flex flex-col gap-2">
                            <Link to="/login" className="w-full px-3 py-2 text-center text-base font-medium text-gray-700 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>
                                Log in
                            </Link>
                            <Link to="/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                                <ShimmerButton className="w-full">Sign up</ShimmerButton>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
