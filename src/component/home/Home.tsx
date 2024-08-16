import "./home.css";
import HomeCarousel from "./homeCarousel/homeCarousel";
import { products, Product } from "../../ts/type";
import { Link } from "react-router-dom";

export default function Home() {
  // Sort products by publishTime in descending order and get the top 5
  const latestProducts: Product[] = products
    .sort(
      (a, b) =>
        new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
    )
    .slice(0, 5);

  return (
    <div className="home">
      {/* <div className="home-banner"></div> */}
      <HomeCarousel />
      <div className="container">
        <div className="new-arrival">New arrivals</div>
        <ul>
          {latestProducts.map((product) => (
            <li key={product.productId}>
              <Link to={`/detail/${product.productId}`}>
                <img src={product.image[0]} alt={product.name} />
                <div className="description">
                  <div className="product-name">{product.name}</div>
                  <div className="price">${product.price}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
