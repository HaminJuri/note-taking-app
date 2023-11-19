"use client";
//! Required
import { useParams, usePathname, useRouter } from "next/navigation";
import { useRef, ElementRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/use-search";
import useSettings from "@/hooks/use-settings";

//! Components
import { ChevronLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import UserItem from "./user-item";
import Item from "./Item";
import { toast } from "sonner";
import DocumentList from "./document-list";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import TrashBox from "./trash-box";
import Navbar from "./navbar";

//! Template
const Navigation = () => {
    const pathname = usePathname();
    const search = useSearch();
    const params = useParams();
    const settings = useSettings();
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const create = useMutation(api.documents.create);

    const isResizingRef = useRef(false);
    const sideBarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);

    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
        if (sideBarRef.current && navbarRef.current) {
            sideBarRef.current.style.width = newWidth + "px";
            navbarRef.current.style.setProperty("left", newWidth + "px");
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sideBarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);
            sideBarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sideBarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);
            sideBarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleCreate = () => {
        const promise = create({ title: "Untitled" }).then((documentId) => router.push(`/documents/${documentId}`));
        toast.promise(promise, {
            loading: "Creating New Note",
            success: "Documented Added Successfully",
            error: "Failed To Create a New Note",
        });
    };

    if (isMobile) {
        return (
            <>
                <aside
                    ref={sideBarRef}
                    className={cn(
                        "group/sidebar fixed z-[999] flex h-full w-full flex-col overflow-y-auto bg-secondary dark:bg-card",
                        isResetting && "transition-all duration-300 ease-in-out",
                    )}
                >
                    <div
                        role="button"
                        onClick={collapse}
                        className={cn(
                            "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
                            isMobile && "opacity-100",
                        )}
                    >
                        <ChevronLeft size="lg" />
                    </div>
                    <div>
                        <UserItem />
                        <Item onClick={search.onOpen} label="Search" icon={Search} isSearch />
                        <Item onClick={settings.onOpen} label="Settings" icon={Settings} />
                        <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
                    </div>
                    <div className="mt-4">
                        <DocumentList />
                        <Item onClick={handleCreate} icon={Plus} label="Add a page" />
                    </div>
                    <Popover>
                        <PopoverTrigger className="mt-4 w-full">
                            <Item label="Trash" icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-0" side={isMobile ? "bottom" : "right"}>
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                    <div
                        onMouseDown={handleMouseDown}
                        onClick={resetWidth}
                        className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/20 opacity-0 transition group-hover/sidebar:opacity-100"
                    />
                </aside>
                <div
                    ref={navbarRef}
                    className={cn(
                        "fixed left-0 top-0 z-[99999] w-full",
                        isResetting && "transition-all duration-300 ease-in-out",
                    )}
                >
                    {!!params.documentId ? (
                        <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
                    ) : (
                        <nav className="w-4 bg-transparent px-3 py-2">
                            {isCollapsed && (
                                <MenuIcon
                                    role="button"
                                    size="lg"
                                    onClick={resetWidth}
                                    className="h-10 w-10 to-red-500 text-muted-foreground"
                                />
                            )}
                        </nav>
                    )}
                </div>
            </>
        );
    }
    if (!isMobile) {
        return (
            <>
                <aside
                    ref={sideBarRef}
                    className={cn(
                        "group/sidebar relative z-[9999] flex h-full w-60 flex-col overflow-y-auto bg-secondary dark:bg-card",
                        isResetting && "transition-all duration-300 ease-in-out",
                        isMobile && "w-0",
                    )}
                >
                    <div
                        role="button"
                        onClick={collapse}
                        className={cn(
                            "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
                            isMobile && "opacity-100",
                        )}
                    >
                        <ChevronLeft size="lg" />
                    </div>
                    <div>
                        <UserItem />
                        <Item onClick={search.onOpen} label="Search" icon={Search} isSearch />
                        <Item onClick={settings.onOpen} label="Settings" icon={Settings} />
                        <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
                    </div>
                    <div className="mt-4">
                        <DocumentList />
                        <Item onClick={handleCreate} icon={Plus} label="Add a page" />
                    </div>
                    <Popover>
                        <PopoverTrigger className="mt-4 w-full">
                            <Item label="Trash" icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-0" side={isMobile ? "bottom" : "right"}>
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                    <div
                        onMouseDown={handleMouseDown}
                        onClick={resetWidth}
                        className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/20 opacity-0 transition group-hover/sidebar:opacity-100"
                    />
                </aside>
                <div
                    ref={navbarRef}
                    className={cn(
                        "absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]",
                        isResetting && "transition-all duration-300 ease-in-out",
                        isMobile && "left-0 w-full",
                    )}
                >
                    {!!params.documentId ? (
                        <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
                    ) : (
                        <nav className="w-4 bg-transparent px-3 py-2">
                            {isCollapsed && (
                                <MenuIcon
                                    role="button"
                                    size="lg"
                                    onClick={resetWidth}
                                    className="h-10 w-10 to-red-500 text-muted-foreground"
                                />
                            )}
                        </nav>
                    )}
                </div>
            </>
        );
    }
};

export default Navigation;
