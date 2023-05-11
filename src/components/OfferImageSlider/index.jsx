import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const OfferImageSlider = (props) => {
   const images = props.offers;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000 // set the delay between each slide transition in milliseconds
    };
    return (
        <Slider {...settings}>
            {images.map(image => (
                <div key={image.ImageURL}>
                    <img src={image.ImageURL} alt="Slider Image" />
                </div>
            ))}
        </Slider>
    )
}
export default OfferImageSlider;