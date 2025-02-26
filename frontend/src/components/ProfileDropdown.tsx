import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronDown, LogOut } from "lucide-react";

export function ProfileDropdown() {
    const { user,logout } = useAuth();

    // Get first letter of name for avatar
    const firstLetter = user?.name?.charAt(0) || "?";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-12 px-3 gap-2 hover:bg-accent">
                    <Avatar className="h-8 w-8 bg-stone-600 text-white">
                        <AvatarFallback className="bg-primary text-primary-foreground">{firstLetter}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="m-2 w-60 bg-white dark:bg-gray-950 border shadow-md">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.name}</p>
                        {/* <p className="text-xs text-muted-foreground">0/5 tasks</p> */}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                    <DropdownMenuItem onClick={()=> logout()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
