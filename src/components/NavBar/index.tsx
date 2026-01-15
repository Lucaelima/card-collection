'use client'

import { useRef } from "react"
import { UserRegister } from "../UserRegister"
import { Container, UserContainer } from "./styles"
import { ModalRef } from "@/types/ModalRef"
import { Button } from "../Button"
import { UserLogin } from "../UserLogin"
import { useAuthStore } from "@/store/authStore"
import ProfileNavBar from "../ProfileNavBar"
import Link from "next/link"
import { SquareLibrary } from "lucide-react"
import { useRouter } from "next/navigation"


export const NavBar = () => {
    const registerRef = useRef<ModalRef>(null as unknown as ModalRef);
    const loginRef = useRef<ModalRef>(null as unknown as ModalRef);
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    console.log(user);

    return (
        <>
            <Container>
                <h1 onClick={() => router.push("/")}>
                    CardCollection
                </h1>
                {user ? (
                    <UserContainer>
                        <Link href="/collection">
                            <SquareLibrary />
                            Coleções
                        </Link>
                        <ProfileNavBar />
                    </UserContainer>
                ) : (
                    <UserContainer>
                        <Button
                            $variant="gray"
                            onClick={() => loginRef.current?.open()}
                        >
                            Entre
                        </Button>
                        <Button
                            $variant="orange"
                            onClick={() => registerRef.current?.open()}
                        >
                            Cadastre-se
                        </Button>
                    </UserContainer>
                )}
            </Container>
            <UserLogin modalRef={loginRef} />
            <UserRegister modalRef={registerRef} />
        </>
    )
}