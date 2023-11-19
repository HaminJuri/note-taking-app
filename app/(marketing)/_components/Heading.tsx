"use client";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <hgroup className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Your Ideas💡, Documents📃, and plans🎯. Unified.</h1>
            <h3 className="text-base font-medium sm:text-xl md:text-2xl">
                Note-It&apos;s connected workspace,
                <br />
                where better, faster work happens.
            </h3>
            {isLoading && <Spinner size="icon" className="mx-auto" />}
            {!isLoading && !isAuthenticated && (
                <SignInButton mode="modal">
                    <Button size="lg">
                        Join and Note It
                        <ChevronRight size={20} />
                    </Button>
                </SignInButton>
            )}
            {!isLoading && isAuthenticated && (
                <>
                    <Button size="lg" className="pl-4 pr-2.5" asChild>
                        <Link href="/documents">
                            Lets Take Some Note
                            <ChevronRight size={20} />
                        </Link>
                    </Button>
                </>
            )}
        </hgroup>
    );
};
export default Heading;
