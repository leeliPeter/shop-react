// import { Product } from "../../../ts/type";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import "./carousel.css"; // Add the CSS file

// interface Props {
//   product: Product;
// }

// const responsive = {
//   mobile: {
//     breakpoint: { max: 4000, min: 0 },
//     items: 1,
//   },
// };

// export default function ProductCarousel({ product }: Props) {
//   return (
//     <Carousel
//       responsive={responsive}
//       infinite
//       autoPlay
//       autoPlaySpeed={3000}
//       swipeable
//       draggable
//       showDots={false}
//       arrows={true}
//     >
//       {product.image.map((img, index) => (
//         <div key={index} className="carousel-image-container">
//           <img
//             src={img}
//             alt={`${product.name} image ${index + 1}`}
//             className="carousel-image"
//           />
//         </div>
//       ))}
//     </Carousel>
//   );
// }

import { Product } from "../../../ts/type";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css"; // Add the CSS file for ProductCarousel

interface Props {
  product: Product;
}

export default function ProductCarousel({ product }: Props) {
  return (
    <div className="product-carousel">
      <Carousel
        showThumbs={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        interval={3000}
        stopOnHover
        dynamicHeight={false}
        swipeable
        emulateTouch
      >
        {product.image.map((img, index) => (
          <div className="carousel-image-container" key={index}>
            <img
              src={img}
              alt={`${product.name} image ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
