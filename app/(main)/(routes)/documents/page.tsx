"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);
    const router = useRouter();

    const onCreate = () => {
        const promise = create({ title: "Untitled" }).then((documentId) => router.push(`/documents/${documentId}`));
        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New Note Created!",
            error: "Failed to create a new Note.",
        });
    };

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
            <Image src="/empty.png" height="300" width="300" alt="Empty" className="dark:hidden" />
            <Image src="/empty-dark.png" height="300" width="300" alt="Empty" className="hidden dark:block" />
            <h2 className="text-lg font-medium">Welcome to {user?.firstName || user?.username}&apos;s Note</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create a note
            </Button>
        </div>
    );
};

export default DocumentsPage;
