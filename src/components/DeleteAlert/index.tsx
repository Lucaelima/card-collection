import { RefObject } from "react";
import { Modal } from "../Modal"
import { ModalRef } from "@/types/ModalRef";
import { Button } from "../Button";
import { useCollectionStore } from "@/store/collectionStore";
import { ButtonsContainer, DeleteAlertContainer } from "./styles";

type DeleteAlertProps = {
    modalRef: RefObject<ModalRef>;
    name: string;
    collectionId: string;
}

const DeleteAlert = ({ modalRef, name, collectionId }: DeleteAlertProps) => {
    const { deleteCollection } = useCollectionStore();

    const handleDelete = () => {
        deleteCollection(collectionId);
        modalRef.current?.close();
    }

    return (
        <Modal ref={modalRef}>
            <DeleteAlertContainer>
                <span>Tem certeza que deseja excluir a coleção &quot;{name}&quot;? Esta ação não pode ser desfeita.</span>
                <ButtonsContainer>
                    <Button
                        $variant="gray"
                        type="button"
                        onClick={() => {
                            modalRef.current?.close();
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        $variant="orange"
                        type="button"
                        onClick={handleDelete}
                    >
                        Excluir
                    </Button>
                </ButtonsContainer>
            </DeleteAlertContainer>

        </Modal>
    )
}

export default DeleteAlert;