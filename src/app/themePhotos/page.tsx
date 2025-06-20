"use client"

import React from "react";
import { useSearchParams } from "next/navigation";
import ThemePhotoList from "../components/ThemePhotos/ThemePhotoList";

export default function ThemePhotosListPage() {
    const searchParams = useSearchParams();
    const themeIdStr = searchParams.get("themeId");
    const themeId = themeIdStr ? parseInt(themeIdStr) : null;

  if (!themeId) return <p>Invalid theme ID</p>;

    return (
        <div>
            <ThemePhotoList themeId={themeId} />
        </div>
    );
}
