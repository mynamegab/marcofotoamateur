import "./PicturesOfTheMoment.scss";

import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel';
import { useEffect, useMemo, useRef } from "react";
import { memo } from "react";



// Very important to memoize your component!!!
const Card = memo(
    function (props) {
        const { data, dataIndex } = props;
        const { cover } = data[dataIndex];
        return (
            <div style={{width: '100%', height: 600}}>
                <img
                    style={{height: '100%', width: '100%', objectFit: 'cover', borderRadius: 10}}
                    draggable={false}
                    src={cover}
                />
            </div>
        );
    },
    function (prev, next) {
      return prev.dataIndex === next.dataIndex;
    }
);

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

    const slides = data.length < 3
        ? 1
        : 3

    return (
      <div style={{ width: '100%', position: 'relative' }}>
            <ResponsiveContainer carouselRef={ref} render={(parentWidth, carouselRef) => {
                onRef(ref);
                return (
                    <StackedCarousel
                            ref={carouselRef}
                            data={data}
                            carouselWidth={parentWidth}
                            slideWidth={1000}
                            slideComponent={Card}
                            maxVisibleSlide={slides}
                            currentVisibleSlide={slides}
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
            }
        };
    }, []);

    if (pictures.length === 0) {
        return null;
    }

    return (
        <div className="pictures-of-the-moment">
            <h2>Photos du moment</h2>
            
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