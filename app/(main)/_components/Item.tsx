//! Required
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

//! Components
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

//! Typing
interface itemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
}

//! Template
const Item = ({ id, documentIcon, active, expanded, isSearch, level = 0, onExpand, label, onClick, icon: Icon }: itemProps) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const router = useRouter();
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);
    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({ id });

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note.",
        });
    };

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    };

    const { user } = useUser();

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({ title: "Untitled", parentDocument: id }).then((documentId) => {
            if (!expanded) {
                onExpand?.();
            }
            router.push(`/documents/${documentId}`);
        });

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note.",
        });
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${level * 12 + 12}px` : "12px",
            }}
            className={cn(
                "group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
                active && "bg-primary/5 text-primary",
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}
            {documentIcon ? (
                <div className="mr-2 shrink-0 text-[18px]">{documentIcon}</div>
            ) : (
                <Icon className="mr-2 h-[18px] w-[18px] shrink-0 text-muted-foreground" />
            )}
            <span className="truncate">{label}</span>
            {!!isSearch && !isMobile && (
                <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                    <span className="text-xs">ctrl+</span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                            <div
                                role="button"
                                className="ml-auto h-full rounded-sm opacity-100 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600 lg:opacity-0"
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="p-2 text-xs text-muted-foreground">
                                Last edited by: {user?.firstName || user?.username}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="ml-auto h-full rounded-sm opacity-100 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600 lg:opacity-0"
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    );
};

Item.skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${level * 12 + 25}px` : "12px",
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    );
};
export default Item;
