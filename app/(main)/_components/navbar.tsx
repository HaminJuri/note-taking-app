"use client";
//! Required
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

//! Components
import { MenuIcon } from "lucide-react";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import { Publish } from "./publish";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

//! Template
const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
    const params = useParams();
    const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<"documents"> });
    if (document === undefined) {
        return (
            <nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-neutral-800">
                <Title.Skeleton />
            </nav>
        );
    }
    return (
        <>
            <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-neutral-900">
                {isCollapsed && <MenuIcon role="button" onClick={onResetWidth} className="h-7 w-7 text-muted-foreground" />}
                <div className="flex w-full items-center justify-between">
                    <Title initialData={document} />
                    <div className="flex items-center gap-x-2">
                        <Publish initialData={document} />
                        <Menu documentId={document._id} />
                    </div>
                </div>
            </nav>
            {document.isArchived && <Banner documentId={document._id} />}
        </>
    );
};

export default Navbar;
