import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel as ReactResComponent } from "react-responsive-carousel";
import { UsablePicture } from "helper/types";

const Carousel = ({ images, ...rest }: { images: Array<UsablePicture> }) => {
    if (images.length === 0) {
        return null;
    }

    return (
        <ReactResComponent {...rest}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image.src} alt={image.caption || `Property Image ${index}`} loading={"lazy"} />
                </div>
            ))}
        </ReactResComponent>
    );
};

export default Carousel;
