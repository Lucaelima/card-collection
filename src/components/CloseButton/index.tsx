import { RefObject } from "react";
import { ButtonContainer } from "./styles";
import { ModalRef } from "@/types/ModalRef";
import { SquareX } from "lucide-react";

type CloseButtonProps = {
    modalRef: RefObject<ModalRef>;
}

const CloseButton = ({ modalRef }: CloseButtonProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        modalRef.current?.close();
    };
    return (
        <ButtonContainer onClick={handleClick}>
            <SquareX size={64} />
        </ButtonContainer>
    )
}

export default CloseButton;