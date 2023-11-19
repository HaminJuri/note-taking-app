"use client";

import Link from "next/link";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    return (
        <div
            className={cn(
                "sticky top-0 z-50 flex w-full items-center justify-between bg-background p-6 duration-200 dark:bg-neutral-900/75 dark:backdrop-blur-md",
                scrolled && "shadow-xl shadow-black/20 dark:shadow-none",
            )}
        >
            <Logo />
            {isLoading && <Spinner size="lg" className="mr-2" />}
            {!isLoading && !isAuthenticated && (
                <SignInButton mode="modal">
                    <Button variant="ghost" size="sm">
                        Log in
                    </Button>
                </SignInButton>
            )}
            {!isLoading && isAuthenticated && (
                <div className="pr-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            )}
            <ModeToggle />
        </div>
    );
};

export default Navbar;
