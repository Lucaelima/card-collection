'use client';

import { ModalRef } from "@/types/ModalRef";
import { RefObject, useState } from "react";
import { Modal } from "../Modal";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { updateAvatar } from "@/services/userService";
import Form from "../Form";
import { useAuthStore } from "@/store/authStore";
import AvatarInput from "../AvatarInput";
import { AvatarContainer } from "./styles";

type AvatarEditProps = {
    modalRef: RefObject<ModalRef>;
};

const AvatarEdit = ({ modalRef }: AvatarEditProps) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const avatarUrl = useAuthStore((s) => s.profile?.avatarUrl);

    const {
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = async () => {
        try {
            if (!file) return;

            await updateAvatar(file);

            setFile(undefined);
            reset();
            modalRef.current?.close();
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar avatar");
        }
    };

    return (
        <Modal ref={modalRef}>
            <h2>Editar Avatar do Usúario</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <AvatarContainer>
                    <label>Avatar</label>
                    <AvatarInput
                        initialImage={avatarUrl}
                        file={file}
                        onChange={setFile}
                    />
                </AvatarContainer>
                <div className="form-row">
                    <Button
                        $variant="gray"
                        type="button"
                        onClick={() => {
                            setFile(undefined);
                            reset();
                            modalRef.current?.close();
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        $variant="orange"
                        type="submit"
                    >
                        Salvar
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default AvatarEdit;