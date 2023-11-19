"use client";
//! Required
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

//! Components
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
    documentId: Id<"documents">;
}

//! Template
const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note.",
        });

        router.push("/documents");
    };

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note.",
        });
    };

    return (
        <div className="flex w-full flex-col items-center justify-center gap-2 bg-rose-600 p-2 text-center text-sm text-white sm:flex-row">
            <p>This page is in the Trash.</p>
            <div className="flex items-center justify-center gap-2">
                <Button
                    size="sm"
                    onClick={onRestore}
                    variant="outline"
                    className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
                >
                    Restore page
                </Button>
                <ConfirmModal onConfirm={onRemove}>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
                    >
                        Delete forever
                    </Button>
                </ConfirmModal>
            </div>
        </div>
    );
};

export default Banner;
