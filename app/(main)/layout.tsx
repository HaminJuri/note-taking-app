"use client";
//! Required
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

//! Components
import Spinner from "@/components/ui/spinner";
import Navigation from "./_components/Navigation";
import SearchCommand from "@/components/search-command";

//! Template
const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return (
            <div className="grid h-full place-items-center">
                <Spinner size="icon" className="" />
            </div>
        );
    }
    if (!isLoading && !isAuthenticated) {
        return redirect("/");
    }
    return (
        <div className="flex h-full dark:bg-neutral-900">
            <Navigation />
            <main className="h-full flex-1 overflow-y-auto">
                <SearchCommand />
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
