"use client";
//! Required
import { useEffect, useState } from "react";

//! Components
import { SettingsModal } from "@/components/modals/settings-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";

//! Template
const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <SettingsModal />
            <CoverImageModal />
        </>
    );
};
export default ModalProvider;
