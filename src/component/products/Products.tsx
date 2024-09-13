import "./products.css";
import { Product } from "../../ts/type";
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";

interface Params {
  [key: string]: string | undefined;
  category?: string;
  position?: string;
}

export default function Main() {
  const navigate = useNavigate();
  const { category, position } = useParams<Params>();
  const products = useAppSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const [filterExpanded, setFilterExpanded] = useState(false);

  useEffect(() => {
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

    setFilteredProducts(filtered);
    setIsEmpty(filtered.length === 0);
    window.scrollTo(0, 0);
  }, [category, position, products]);

  const toggleFilter = () => {
    if (filterRef.current) {
      if (!filterExpanded) {
        filterRef.current.style.height = "190px";
        filterRef.current.style.color = "rgb(93, 65, 65)";
      } else {
        filterRef.current.style.height = "0";
        filterRef.current.style.color = "rgb(246, 218, 186)";
      }
      setFilterExpanded(!filterExpanded);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      filterContainerRef.current &&
      filterRef.current &&
      !filterContainerRef.current.contains(e.target as Node) &&
      !filterRef.current.contains(e.target as Node)
    ) {
      closeFilter();
    }
  };

  const closeFilter = () => {
    if (filterRef.current) {
      filterRef.current.style.height = "0";
      filterRef.current.style.color = "rgb(246, 218, 186)";
    }
    setFilterExpanded(false);
  };

  const handleFilterClick = (option: string) => {
    let sortedProducts = [...filteredProducts];

    switch (option) {
      case "PriceUp":
        sortedProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * a.discount : a.price;
          const priceB = b.discount ? b.price * b.discount : b.price;
          return priceB - priceA; // Sort by discounted price (high to low)
        });
        break;
      case "PriceDown":
        sortedProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * a.discount : a.price;
          const priceB = b.discount ? b.price * b.discount : b.price;
          return priceA - priceB; // Sort by discounted price (low to high)
        });
        break;
      case "SaleUp":
        sortedProducts.sort((a, b) => {
          const aTotalSales = a.sale.reduce(
            (acc, sale) => acc + sale.number,
            0
          );
          const bTotalSales = b.sale.reduce(
            (acc, sale) => acc + sale.number,
            0
          );
          return bTotalSales - aTotalSales; // Sort by total sales (high to low)
        });
        break;
      case "SaleDown":
        sortedProducts.sort((a, b) => {
          const aTotalSales = a.sale.reduce(
            (acc, sale) => acc + sale.number,
            0
          );
          const bTotalSales = b.sale.reduce(
            (acc, sale) => acc + sale.number,
            0
          );
          return aTotalSales - bTotalSales; // Sort by total sales (low to high)
        });
        break;
      case "AZ":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name (A-Z)
        break;
      case "ZA":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name)); // Sort by name (Z-A)
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
    closeFilter();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isEmpty ? (
        <main>
          <div className="container">
            <div
              className="filter"
              onClick={toggleFilter}
              ref={filterContainerRef}
            >
              <div className="iconfont icon-filter"></div>
              <div className="word">Filter</div>
            </div>
            <div className="filter-options" ref={filterRef}>
              <ul>
                {/* Price sorting options */}
                <li
                  className="price-up"
                  onClick={() => handleFilterClick("PriceUp")}
                >
                  Price
                  <span className="iconfont icon-upper"></span>
                </li>
                <li
                  className="price-down"
                  onClick={() => handleFilterClick("PriceDown")}
                >
                  Price
                  <span className="iconfont icon-upper"></span>
                </li>

                {/* Sales sorting options */}
                <li
                  className="sale-up"
                  onClick={() => handleFilterClick("SaleUp")}
                >
                  Sales
                  <span className="iconfont icon-upper"></span>
                </li>
                <li
                  className="sale-down"
                  onClick={() => handleFilterClick("SaleDown")}
                >
                  Sales
                  <span className="iconfont icon-upper"></span>
                </li>

                <li onClick={() => handleFilterClick("AZ")}>A-Z</li>
                {/* <li onClick={() => handleFilterClick("ZA")}>Z-A</li> */}
              </ul>
            </div>
            <ul>
              {filteredProducts.map((product: Product) => {
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
                            <span className="discountPrice">
                              ${discountPrice}
                            </span>
                          </>
                        ) : (
                          <span className="price">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {filteredProducts.length >= 4 && (
              <div
                className="show-more"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="iconfont icon-to-top"></span>
              </div>
            )}
          </div>
        </main>
      ) : (
        <main>
          <div className="container">
            <div className="notfound">
              <div className="reminder">
                <div>
                  Sorry, we couldn't find any items matching your selection.
                </div>
                <div className="goback-btn" onClick={() => navigate("/")}>
                  Go Back
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
