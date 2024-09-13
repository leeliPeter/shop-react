// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // import { homeImages } from "../../../ts/type";
// import { useAppSelector } from "../../../Redux/hooks";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import "./homeCarousel.css"; // Import the CSS file for HomeCarousel

// export default function HomeCarousel() {
//   const homeImages = useAppSelector((state) => state.homeImages.homeImages); // Access homeImages from
//   console.log("Carousel images:", homeImages);
//   return (
//     <div className="home-carousel">
//       <Carousel
//         showThumbs={false}
//         infiniteLoop
//         useKeyboardArrows
//         autoPlay
//         interval={3000}
//         stopOnHover
//         dynamicHeight
//         swipeable
//         emulateTouch
//       >
//         {homeImages.map((item, index) => (
//           <div key={index}>
//             <Link to={item.url} style={{ display: "block", height: "100%" }}>
//               <img src={item.image} alt={`Home image ${index + 1}`} />
//             </Link>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import the carousel styles
import { useAppSelector } from "../../../Redux/hooks";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./homeCarousel.css"; // Import the CSS file for HomeCarousel
// import { homeImages } from "../../../ts/type"; // Import homeImages from data folder

const responsive = {
  superLargeDesktop: {
    // Change this to your desired settings for large screens
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 2600 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 2600, min: 1850 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 1850, min: 0 },
    items: 1,
  },
};

export default function HomeCarousel() {
  const homeImages = useAppSelector((state) => state.homeImages.homeImages); // Access homeImages from Redux store
  return (
    <div className="home-carousel">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        // Add any additional props or configurations you need
      >
        {homeImages.map((item, index) => (
          <div key={index}>
            <Link to={item.url} style={{ display: "block", height: "100%" }}>
              <img src={item.image} alt={`Home image ${index + 1}`} />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
