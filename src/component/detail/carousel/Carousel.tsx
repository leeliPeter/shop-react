import { Product } from "../../../ts/type";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
  product: Product;
}

export default function ProductCarousel({ product }: Props) {
  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay
      interval={3000}
      stopOnHover
      dynamicHeight
      swipeable
      emulateTouch
    >
      {product.image.map((img, index) => (
        <div key={index}>
          <img src={img} alt={`${product.name} image ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
}
