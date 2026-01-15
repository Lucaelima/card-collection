import { RefObject } from "react";
import { Modal } from "../Modal";
import { ModalRef } from "@/types/ModalRef";
import { IYuGiOh } from "@/types/ICards";
import CloseButton from "../CloseButton";
import { CardImage, ContainerDetailCard, Details, Informations } from "./styles";

type DetailCardProps = {
    modalRef: RefObject<ModalRef>;
    card: IYuGiOh;
    cardType: "Yu-Gi-Oh!"
}

const DetailCard = ({ modalRef, card, cardType }: DetailCardProps) => {

    return (
        <Modal ref={modalRef}>
            <ContainerDetailCard>
                <CloseButton modalRef={modalRef} />
                <Details>
                    <CardImage src={
                        card.image_url ? card.image_url : ""}
                        alt="Imagem da carta"
                        width={900}
                        height={1600}
                    />
                    <Informations>
                        <h2>{card.name}</h2>
                        <div>
                            <h3>Tipo de Carta:</h3>
                            {card.type}
                        </div>
                        {(card.type === "Spell Card" || card.type === "Trap Card") ? (
                            <>
                                <div>
                                    <h3>Tipo:</h3>
                                    {card.race}
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h3>Nível:</h3>
                                    {card.level}
                                </div>
                                <div>
                                    <h3>Atributo:</h3>
                                    {card.attribute}
                                </div>
                                <div>
                                    <h3>Tipo de Monstro:</h3>
                                    {card.race}
                                </div>
                                <div>
                                    <div>
                                        <h3>ATK:</h3>
                                        {card.atk}
                                    </div>
                                    <div>
                                        {card.type !== "Link Monster" ? (
                                            <>
                                                <h3>DEF:</h3>
                                                {card.def}
                                            </>
                                        ) : (
                                            <>
                                                <h3>Link:</h3>
                                                {card.linkval}
                                            </>
                                        )}
                                    </div>
                                </div>
                                {card.type === "Pendulum Effect Monster" ? (
                                    <>
                                        <div>
                                            <h3>Escala de Pêndulo:</h3>
                                            {card.scale}
                                        </div>
                                    </>
                                ) : null}
                            </>
                        )}
                        <h3>Texto da Carta</h3>
                        <p>{card.desc}</p>
                    </Informations>
                </Details>
            </ContainerDetailCard>
        </Modal>
    )
}

export default DetailCard;