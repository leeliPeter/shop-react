import "./home.css";
import HomeCarousel from "./homeCarousel/homeCarousel";
import { Product } from "../../ts/type";
import { useAppSelector } from "../../Redux/hooks";
import { Link } from "react-router-dom";

export default function Home() {
  const products = useAppSelector((state) => state.products.products);

  // Create a copy of the products array and sort by publishTime in descending order
  const sortedProducts = [...products].sort(
    (a, b) =>
      new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  );

  // Get the top 5 latest products
  const latestProducts: Product[] = sortedProducts.slice(0, 4);

  return (
    <div className="home">
      <HomeCarousel />
      <div className="container">
        <div className="new-arrival">New arrivals</div>
        <ul>
          {latestProducts.map((product) => {
            // Calculate discount price if there is a discount
            const discountPrice = product.discount
              ? (product.price * product.discount).toFixed(2)
              : null;

            return (
              <li key={product.productId}>
                <Link to={`/detail/${product.productId}`}>
                  <img src={product.image[0]} alt={product.name} />
                  <div className="description">
                    <div className="product-brand">
                      {product.brand
                        ? product.brand.charAt(0).toUpperCase() +
                          product.brand.slice(1)
                        : ""}
                    </div>
                    <div className="product-name">{product.name}</div>
                    {discountPrice ? (
                      <>
                        <span className="price abandonedPrice">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="discountPrice">${discountPrice}</span>
                      </>
                    ) : (
                      <span className="price">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
