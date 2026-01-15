'use client';

import { useEffect, useRef, useState } from "react";
import defaultAvatar from "@/assets/profile/default-photo.jpg";
import { AvatarImage, AvatarInputContainer } from "./styles";
import { PlusCircle } from "lucide-react";

type AvatarInputProps = {
    initialImage?: string;
    file?: File | undefined;
    onChange: (file: File | undefined) => void;
};

const AvatarInput = ({
    onChange,
    initialImage,
    file,
}: AvatarInputProps) => {
    const [preview, setPreview] = useState<string | undefined>(initialImage);
    const inputRef = useRef<HTMLInputElement>(null);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreview(initialImage);
        }
    }, [file, initialImage]);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) return null;

    return (
        <AvatarInputContainer>
            <input
                ref={inputRef}
                id="avatar-input"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onChange(e.target.files?.[0] ?? undefined)}
            />
            <label htmlFor="avatar-input">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                >
                    <AvatarImage
                        src={preview ?? defaultAvatar.src}
                        alt="Avatar"
                    />
                </button>
                <span>
                    <PlusCircle size={50} />
                </span>
            </label>
        </AvatarInputContainer>
    );
};

export default AvatarInput;
