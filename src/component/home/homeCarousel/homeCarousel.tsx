import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { homeImages } from "../../../ts/type";
import "./homeCarousel.css"; // Import the CSS file for HomeCarousel

export default function HomeCarousel() {
  return (
    <div className="home-carousel">
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
        {homeImages.map((item, index) => (
          <div key={index}>
            <a href={item.url} style={{ display: "block", height: "100%" }}>
              <img src={item.image} alt={`Home image ${index + 1}`} />
            </a>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
