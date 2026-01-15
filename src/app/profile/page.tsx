"use client"

import FavoriteCollection from "@/components/FavoriteCollection";
import MainContent from "@/components/MainContent";
import ProfileInformation from "@/components/ProfileInformation";

export default function Profile() {
    return (
        <MainContent>
            <h2>Página de Perfil</h2>
            <ProfileInformation />
            <FavoriteCollection />
        </MainContent>
    )
}