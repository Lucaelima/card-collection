import { useAuthStore } from "@/store/authStore";
import { DropdownList, ProfileNavBarContainer, ProfilePhoto, UserName } from "./styles";
import { useEffect, useRef, useState } from "react";
import defaultPhoto from "@/assets/profile/default-photo.jpg";
import { useRouter } from "next/navigation";

const ProfileNavBar = () => {
    const logout = useAuthStore((state) => state.logoutLocal);
    const username = useAuthStore((s) => s.profile?.username);
    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const avatarUrl = useAuthStore((s) => s.profile?.avatarUrl);
    const router = useRouter();
    const formattedUsername = username
        ? username.charAt(0).toUpperCase() + username?.slice(1).toLowerCase()
        : "";

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setVisible(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, []);

    return (
        <ProfileNavBarContainer ref={containerRef}>
            <UserName>
                {formattedUsername}
            </UserName>
            <ProfilePhoto
                src={avatarUrl ?? defaultPhoto.src}
                alt="Foto do usuário"
                onClick={() => (setVisible(!visible))}
            />
            <DropdownList $visible={visible}>
                <li onClick={() => router.push("/profile")}>
                    Perfil
                </li>
                <li onClick={() => logout()}>
                    Sair
                </li>
            </DropdownList>
        </ProfileNavBarContainer>
    )
}

export default ProfileNavBar;