"use client";
//! Required
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import useCoverImage from "@/hooks/use-cover-image";

//! Components
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import TextareaAutoSize from "react-textarea-autosize";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
}

//! Template
const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);
    const coverImage = useCoverImage();

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled",
        });
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon,
        });
    };

    const onRemoveIcon = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        removeIcon({
            id: initialData._id,
        });
    };

    return (
        <div className="group relative pl-[54px]">
            {!!initialData.icon && !preview && (
                <div className="group/icon relative flex w-fit items-center gap-x-2 pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <Button
                            onClick={onRemoveIcon}
                            variant="ghost"
                            size="sm"
                            className="absolute left-0 top-0 z-50 aspect-square rounded-full px-0 text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <p className="text-6xl transition hover:opacity-75">{initialData.icon}</p>
                    </IconPicker>
                </div>
            )}
            {!!initialData.icon && preview && <p className="pt-6 text-6xl">{initialData.icon}</p>}
            <div className="flex items-center gap-x-1 py-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                {!initialData.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect}>
                        <Button variant="outline" size="sm" className="text-xs text-muted-foreground">
                            <Smile className="mr-2 h-4 w-4" />
                            Add Icon
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Button variant="outline" size="sm" onClick={coverImage.onOpen} className="text-xs text-muted-foreground">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Add Cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutoSize
                    ref={inputRef}
                    onFocus={(e) => e.target.select()}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
                >
                    {initialData.title}
                </div>
            )}
        </div>
    );
};

export default Toolbar;
