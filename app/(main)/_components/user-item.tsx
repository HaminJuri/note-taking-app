"use client";
import { ChevronsLeftRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";

const UserItem = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div role="button" className="flex w-full items-center p-3 text-sm hover:bg-primary/5">
                        <div className="flex items-center gap-x-2 md:max-w-[250px]">
                            <Avatar className="h-7 w-7">
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                            <span className="line-clamp-1 text-start font-medium">
                                {user?.fullName || user?.username}&apos;s Notes
                            </span>
                        </div>
                        <ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90 text-muted-foreground" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
                    <div className="flex flex-col space-y-4 p-2">
                        <p className="text-xs font-medium leading-none text-muted-foreground">
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                        <div className="flex items-center gap-x-2">
                            <div className="rounded-md bg-secondary p-1">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.imageUrl} />
                                </Avatar>
                            </div>
                            <div className="space-y-1">
                                <p className="line-clamp-1 text-sm">{user?.fullName || user?.username}&apos;s Notes</p>
                            </div>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
                        <SignOutButton>Log out</SignOutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default UserItem;
