import "./PicturesOfTheMoment.scss";

import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel';
import { useRef } from "react";
import { memo } from "react";

const data = [
    {
        cover: 'https://storage.googleapis.com/marcofotoamateur-gallery/display/569e5f21-f39f-4849-a891-d022cfc2b063.JPG',
        title: 'Interstaller'
    },
    {
        cover: 'https://storage.googleapis.com/marcofotoamateur-gallery/display/d9728ac6-0f60-4d31-8b79-0b104a588d1c.JPG',
        title: 'Interstaller'
    },
    {
        cover: 'https://storage.googleapis.com/marcofotoamateur-gallery/display/faf9e0ca-ca8b-4df9-9e1e-204a7e48e6e9.JPG',
        title: 'Interstaller'
    }
];

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
    onRef
}) {
    const ref = useRef();
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
                          maxVisibleSlide={3}
                          currentVisibleSlide={3}
                          transitionTime={500}
                  />
              )
            }}/>
      </div>
    );
};

let timeout = null;
export default () => {
    return (
        <div className="pictures-of-the-moment">
            <h2>Photos du moment</h2>
            
            <div className="carousel-container">
                <ResponsiveCarousel onRef={(ref) => {
                    if (!timeout && ref) {
                        timeout = setInterval(() => {
                            ref.current.goNext();
                        }, 5000);
                    }
                }}/>
            </div>
        </div>
    );
};