import { CardContainer, CardImage } from "./styles"
import { IYuGiOh } from "@/types/ICards";
import { Button } from "../Button";
import DetailCard from "../DetailCard";
import { useRef } from "react";
import { ModalRef } from "@/types/ModalRef";
import InsertCardCollection from "../InsertCardCollection";

interface CardProps {
    name: string;
    image: string | null;
    card: IYuGiOh;
    cardType: "Yu-Gi-Oh!";
}

const Card = ({ name, image, card, cardType }: CardProps) => {
    const detailRef = useRef<ModalRef>(null as unknown as ModalRef);
    const insertRef = useRef<ModalRef>(null as unknown as ModalRef);

    return (
        <CardContainer onClick={() => detailRef.current?.open()}>
            <h3>{name}</h3>
            <CardImage
                src={image ? image : ""}
                alt="Imagem da carta"
                width={180}
                height={1000}
            />
            <Button
                $variant="orange"
                onClick={(e) => {
                    e.stopPropagation();
                    console.log("abrir modal de inserir na coleção");
                    insertRef.current?.open();
                }}
            >
                Adicionar a sua coleção
            </Button>
            <DetailCard modalRef={detailRef} card={card} cardType={cardType} />
            <InsertCardCollection modalRef={insertRef} cardData={card} cardType={cardType} />
        </CardContainer >
    )
}

export default Card;