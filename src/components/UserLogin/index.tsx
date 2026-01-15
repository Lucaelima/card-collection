import { useForm } from "react-hook-form";
import { RefObject } from "react";
import { ModalRef } from "@/types/ModalRef";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { useAuthStore } from "@/store/authStore";
import Form from "../Form";
import { loginUser } from "@/services/userService";

type LoginData = {
    username: string;
    password: string;
};

type UserLoginProps = {
    modalRef: RefObject<ModalRef>;
};

export const UserLogin = ({ modalRef }: UserLoginProps) => {
    const setUser = useAuthStore((s) => s.setUser);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginData>();

    const onSubmit = async (data: LoginData) => {
        try {
            const { user } = await loginUser(data.username, data.password);

            setUser(user);

            reset();
            modalRef.current?.close();
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Ocorreu um erro ao logar.");
            }
        }

    };

    return (
        <Modal ref={modalRef}>
            <h2>Entrar com Usuário</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <label>Usuário</label>
                    <input
                        type="text"
                        {...register("username", { required: "Usuário obrigatório" })}
                    />
                </div>
                {errors.username && <span>{errors.username.message}</span>}

                <div className="form-row">
                    <label>Senha</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Senha obrigatória",
                        })}
                    />
                </div>
                {errors.password && <span>{errors.password.message}</span>}

                <div className="form-row">
                    <Button
                        $variant="gray"
                        onClick={() => {
                            reset();
                            modalRef.current?.close();
                        }}
                        type="button"
                    >
                        Cancelar
                    </Button>
                    <Button $variant="orange" type="submit">
                        Entrar
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

UserLogin.displayName = "UserLogin";
