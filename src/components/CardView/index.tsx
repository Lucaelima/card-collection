import { ContainerCardView, ImageCardView } from "./styles";
import DetailCard from "../DetailCard";
import { useRef } from "react";
import { ModalRef } from "@/types/ModalRef";
import { IYuGiOh } from "@/types/ICards";

interface CardViewProps {
    name: string;
    image: string | null;
    card: IYuGiOh;
    cardType: "Yu-Gi-Oh!";
}

const CardView = ({ image, name, card, cardType }: CardViewProps) => {
    const detailRef = useRef<ModalRef>(null as unknown as ModalRef);
    return (
        <ContainerCardView
            onClick={() => detailRef.current?.open()}
        >
            <ImageCardView
                src={image ? image : ""}
                alt={name}
                width={200}
                height={500}
            />
            <DetailCard
                modalRef={detailRef}
                card={card}
                cardType={cardType}
            />
        </ContainerCardView>
    )
}

export default CardView;