import "./PicturesOfTheMoment.scss";

import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';
import { useEffect, useMemo, useRef } from "react";


function ResponsiveCarousel({
    onRef,
    pictures
}) {
    const ref = useRef();
    const data = useMemo(() => {
        return pictures.map(picture => ({
            cover: `https://storage.googleapis.com/marcofotoamateur-gallery/display/${picture.assetId}.${picture.format}`
        }))
    }, pictures);

    return (
      <div style={{ width: '100%', position: 'relative' }}>
            <ResponsiveContainer carouselRef={ref} render={(parentWidth, carouselRef) => {
                onRef(ref);

                const oddAvailableSlides = data.length < 5
                    ? (data.length < 3
                        ? 1
                        : 3)
                    : 5

                let currentVisibleSlide = 5;
                if (parentWidth <= 1440) currentVisibleSlide = 3;
                if (parentWidth <= 1080) currentVisibleSlide = 1;

                const getSlideWidth = () => {
                    if (parentWidth > 1440) {
                        return 1000;
                    }

                    if (parentWidth > 1000) {
                        return 750;
                    }

                    return parentWidth - 0.1 * parentWidth;
                };
                
                const Card = (props) => {
                    const { data, dataIndex, slideIndex } = props;
                    const { cover } = data[dataIndex];
                    return (
                        <div className={`slide depth-${Math.abs(slideIndex)}`} style={{ width: '100%', height: getSlideWidth() * 0.6 }}>
                            <img
                                style={{height: '100%', width: '100%', objectFit: 'cover'}}
                                draggable={false}
                                src={cover}
                            />
                        </div>
                    );
                };

                return (
                    <StackedCarousel
                        ref={carouselRef}
                        data={data}
                        carouselWidth={parentWidth}
                        slideWidth={getSlideWidth()}
                        slideComponent={Card}
                        maxVisibleSlide={oddAvailableSlides}
                        currentVisibleSlide={Math.min(currentVisibleSlide, oddAvailableSlides)}
                        transitionTime={500}
                    />
                );
            }}/>
      </div>
    );
};

let timeout = null;
export default ({ pictures }) => {
    useEffect(() => {
        return () => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
        };
    }, []);

    if (pictures.length === 0) {
        return null;
    }

    return (
        <div className="pictures-of-the-moment">
            <h2 className="title">Photos du moment</h2>
            
            <div className="carousel-container">
                <ResponsiveCarousel pictures={pictures} onRef={(ref) => {
                    if (!timeout && ref) {
                        timeout = setInterval(() => {
                            if (ref) {
                                ref.current.goNext();
                            }
                        }, 5000);
                    }
                }}/>
            </div>
        </div>
    );
};