'use client'

import { ModalRef } from "@/types/ModalRef";
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { ContentContainer, DialogContainer } from "./styles";

type ModalProps = {
    children: ReactNode;
}

export const Modal = forwardRef<ModalRef, ModalProps>(({ children }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
    }));

    return (
        <DialogContainer
            ref={dialogRef}
            onClick={(e) => { e.stopPropagation() }}
        >
            <ContentContainer>
                {children}
            </ContentContainer>
        </DialogContainer>
    )
});

Modal.displayName = "Modal";