import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

const ImageCarousel = ({images}) => {
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
            {images.map((image, index) => (
                <CarouselItem key={index}>
                    <img src={image} className="w-full"/>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default ImageCarousel