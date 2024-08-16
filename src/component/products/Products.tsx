import "./products.css";
import { Product } from "../../ts/type";
import { products } from "../../ts/type";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Params {
  [key: string]: string | undefined;
  category?: string;
  position?: string;
}

export default function Main() {
  const { category, position } = useParams<Params>();
  const [product, setProduct] = useState<Product[]>(products);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Filter products based on category and position
    const filtered = products.filter((product: Product) => {
      let match = true;
      if (category) {
        match = match && product.category === category;
      }
      if (position) {
        match = match && product.position === position;
      }
      return match;
    });

    // Update the state with filtered products and the empty status
    setProduct(filtered);
    setIsEmpty(filtered.length === 0);
    console.log("empty", isEmpty);
    window.scrollTo(0, 0);
  }, [category, position]);

  return (
    <>
      {!isEmpty ? (
        <main>
          <div className="container">
            <ul>
              {product.map((product: Product) => {
                return (
                  <li key={product.productId}>
                    <Link to={`/detail/${product.productId}`}>
                      <img src={product.image[0]} alt="" />
                      <div className="description">
                        <div className="product-name">{product.name}</div>
                        <div className="price">${product.price}</div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="show-more">
              <span>Show More</span>
            </div>
          </div>
        </main>
      ) : (
        <main>
          <div className="container">
            <div className="notfound">
              <div className="reminder">
                Sorry, we couldn't find any items matching your selection.
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
