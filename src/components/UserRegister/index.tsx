import { useForm } from "react-hook-form";
import { RefObject, useState } from "react";
import { ModalRef } from "@/types/ModalRef";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { useAuthStore } from "@/store/authStore";
import Form from "../Form";
import { registerUser } from "@/services/userService";
import AvatarInput from "../AvatarInput";

type FormData = {
    username: string;
    password: string;
    confirmPassword: string;
};

type UserRegisterProps = {
    modalRef: RefObject<ModalRef>;
};

export const UserRegister = ({ modalRef }: UserRegisterProps) => {
    const [file, setFile] = useState<File | undefined>(undefined);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormData>();

    const setUser = useAuthStore((s) => s.setUser);

    const onSubmit = async (data: FormData) => {
        try {
            const result = await registerUser(
                data.username,
                data.password,
                file
            );

            if (result.user) {
                setUser(result.user);
            }
            setFile(undefined);
            reset();
            modalRef.current?.close();
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Ocorreu um erro ao registrar");
            }
        }

    };

    const password = watch("password");

    return (
        <Modal ref={modalRef}>
            <h2>Cadastro de Usuário</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <label>Avatar</label>
                    <AvatarInput
                        initialImage={undefined}
                        file={file}
                        onChange={setFile}
                    />
                </div>
                <div className="form-row">
                    <label>Usuário</label>
                    <input
                        type="text"
                        {...register("username", { required: "Usuário obrigatório" })}
                    />
                </div>
                {errors.username && (
                    <span>
                        {errors.username.message}
                    </span>
                )}

                <div className="form-row">
                    <label>Senha</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Senha obrigatória",
                            minLength: {
                                value: 8,
                                message: "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.",
                            },
                            validate: (value) => {
                                if (!/[A-Z]/.test(value)) {
                                    return "A senha deve conter pelo menos uma letra maiúscula";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "A senha deve conter pelo menos um número";
                                }
                                if (!/[!@#$%^&*(),.?":{}|<>+-]/.test(value)) {
                                    return "A senha deve conter pelo menos um caractere especial";
                                }
                                return true;
                            }
                        })}
                    />
                </div>
                {errors.password && (
                    <span>
                        {errors.password.message}
                    </span>
                )}

                <div className="form-row">
                    <label>Confirmar Senha</label>
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            required: "Confirme a senha",
                            validate: (value) =>
                                value === password || "As senhas não conferem",
                        })}
                    />
                </div>
                {errors.confirmPassword && (
                    <span>
                        {errors.confirmPassword.message}
                    </span>
                )}

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
    );
};

UserRegister.displayName = "UserRegister";