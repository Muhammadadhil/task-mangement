import {Link} from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoolMode } from "./magicui/cool-mode";
import { ShimmerButton } from "./magicui/shimmer-button";

export function Header() {
    return (
        <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-white">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">TaskFlow</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Button variant="ghost" className="flex items-center">
                            Product <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <CoolMode>
                        <Link to="/login" className="hidden md:inline-flex">
                            Log in
                        </Link>
                    </CoolMode>

                    <Link to="/signup">
                        <ShimmerButton className="h-10 shadow-2xl">Sign up</ShimmerButton>
                    </Link>
                </div>
            </div>
        </header>
    );
}
