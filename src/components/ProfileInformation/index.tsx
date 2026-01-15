import { useAuthStore } from "@/store/authStore";
import { InfoRow, ProfieleDetails, ProfileImage, ProfileInformationContainer } from "./styles"
import defaultPhoto from "@/assets/profile/default-photo.jpg";
import { SquarePen } from "lucide-react";
import { ModalRef } from "@/types/ModalRef";
import { useRef } from "react";
import AvatarEdit from "../AvatarEdit";

const ProfileInformation = () => {
    const AvatarEditRef = useRef<ModalRef>(null as unknown as ModalRef);
    const avatarUrl = useAuthStore((s) => s.profile?.avatarUrl);
    const username = useAuthStore((s) => s.profile?.username);
    const formattedUsername = username
        ? username.charAt(0).toUpperCase() + username?.slice(1).toLowerCase()
        : "";

    return (
        <ProfileInformationContainer>
            <InfoRow>
                <ProfileImage
                    src={avatarUrl ?? defaultPhoto.src}
                    alt="Imagem de perfil do usuário"
                />
                <ProfieleDetails>
                    <a onClick={() => AvatarEditRef.current?.open()}><SquarePen /></a>
                    <h3>{formattedUsername}</h3>
                </ProfieleDetails>
                <AvatarEdit modalRef={AvatarEditRef} />
            </InfoRow>
            <div></div>
        </ProfileInformationContainer>
    )
}

export default ProfileInformation;