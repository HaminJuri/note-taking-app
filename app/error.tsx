"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const Error = () => {
    return (
        <>
            <div className="flex h-full flex-col items-center justify-center space-y-4">
                <Image src="/error.png" alt="error image" height="300" width="300" className="dark:hidden" />
                <Image src="/error-dark.png" alt="error image" height="300" width="300" className="hidden dark:block" />
                <h2 className="text-xl font-medium">
                    Oh!
                    <br />
                    Something Went Wrong.
                </h2>
                <Button variant="ghost" asChild>
                    <Link href="/documents">Go Back</Link>
                </Button>
            </div>
        </>
    );
};

export default Error;
