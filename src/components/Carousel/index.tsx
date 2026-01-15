import { ReactNode } from "react";
import { ArrowButton, CarouselContainer, CarouselContent } from "./styles";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CarouselProps = {
    children: ReactNode;
    scrollRef: React.RefObject<HTMLDivElement> | null;
    onScroll?: () => void;
};

const Carousel = ({ children, scrollRef, onScroll }: CarouselProps) => {

    const scrollLeft = () => {
        if (scrollRef) {
            scrollRef.current.scrollBy({ left: -440, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef) {
            scrollRef.current.scrollBy({ left: 440, behavior: "smooth" });
        }
    };

    return (
        <CarouselContainer>
            <ArrowButton
                type="button"
                onClick={scrollLeft}
            ><ArrowLeft /></ArrowButton>
            <CarouselContent ref={scrollRef} onScroll={onScroll}>
                {children}
            </CarouselContent>
            <ArrowButton
                type="button"
                onClick={scrollRight}
            ><ArrowRight /></ArrowButton>
        </CarouselContainer>
    )
}

export default Carousel;