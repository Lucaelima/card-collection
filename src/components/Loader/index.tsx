import { Card, CardLoader, LoaderContainer } from "./styles";

const Loader = () => {
    const cards = Array.from({ length: 22 });

    return (
        <LoaderContainer>
            <CardLoader>
                {cards.map((_, i) => (
                    <Card key={i} $i={i} />
                ))}
            </CardLoader>
            Carregando...
        </LoaderContainer>

    );
}

export default Loader;