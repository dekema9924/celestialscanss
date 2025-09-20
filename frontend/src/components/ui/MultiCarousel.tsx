import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface MultiCarouselProps {
    children: React.ReactNode;
}

function MultiCarousel({ children }: MultiCarouselProps) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1,
        },
    };

    return (
        <Carousel
            swipeable
            draggable
            responsive={responsive}
            ssr={true} // server-side rendering
            infinite={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 700ms ease-in-out"
            transitionDuration={700}
            containerClass="carousel-container"
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="px-2"
        >
            {children}
        </Carousel>
    );
}

export default MultiCarousel;
