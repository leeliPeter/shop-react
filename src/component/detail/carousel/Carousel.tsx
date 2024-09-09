import { Product } from "../../../ts/type";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./carousel.css"; // Add the CSS file

interface Props {
  product: Product;
}

const responsive = {
  mobile: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

export default function ProductCarousel({ product }: Props) {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      swipeable
      draggable
      showDots={false}
      arrows={true}
    >
      {product.image.map((img, index) => (
        <div key={index} className="carousel-image-container">
          <img
            src={img}
            alt={`${product.name} image ${index + 1}`}
            className="carousel-image"
          />
        </div>
      ))}
    </Carousel>
  );
}
