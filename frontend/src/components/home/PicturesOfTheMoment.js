import "./PicturesOfTheMoment.scss";

import SlickSlider from "react-slick";

export default () => {
    const slickSettings = {
        dots: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        adaptiveHeight: true
    };

    return (
        <div className="pictures-of-the-moment">
            <h2>Photos du moment</h2>
            
            <div className="carousel-container">
                <SlickSlider { ...slickSettings }>
                    <img src="https://storage.googleapis.com/marcofotoamateur-gallery/display/faf9e0ca-ca8b-4df9-9e1e-204a7e48e6e9.JPG" />
                    <img src="https://storage.googleapis.com/marcofotoamateur-gallery/display/569e5f21-f39f-4849-a891-d022cfc2b063.JPG" />
                    <img src="https://storage.googleapis.com/marcofotoamateur-gallery/display/d9728ac6-0f60-4d31-8b79-0b104a588d1c.JPG" />
                </SlickSlider>
            </div>
        </div>
    );
};