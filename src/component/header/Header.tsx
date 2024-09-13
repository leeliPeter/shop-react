import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";
import "./header.css";

const Header: React.FC = () => {
  const products = useAppSelector((state) => state.products.products); // Access products from Redux state
  const location = useLocation();
  const renderGuide = () => {
    // If pathname is "/", only return Home
    if (location.pathname === "/") {
      return (
        <ul>
          <li className="iconfont icon-home" style={{ display: "flex" }}>
            <div
              style={{
                fontFamily:
                  "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
                marginLeft: "5px",
              }}
            >
              <Link to="/">Home</Link>
            </div>
          </li>
        </ul>
      );
    }

    // Split the pathname by "/"
    const paths = location.pathname.split("/");

    // Check if the first segment is "products"
    if (paths[1] === "products") {
      const category = paths[2]; // e.g., "mens", "womens", "fnb", "others"
      const subCategory = paths[3]; // e.g., "top", "bottom", "shoes"

      return (
        <ul>
          <li className="iconfont icon-home" style={{ display: "flex" }}>
            <div
              style={{
                fontFamily:
                  "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
                marginLeft: "5px",
              }}
            >
              <Link to="/">Home</Link>
            </div>
          </li>
          {category && (
            <li>
              <Link to={`/products/${category}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            </li>
          )}
          {subCategory && (
            <li>
              <Link to={`/products/${category}/${subCategory}`}>
                {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
              </Link>
            </li>
          )}
        </ul>
      );
    }

    // Check if the pathname is related to a product detail page
    if (paths[1] === "detail" && paths[2]) {
      const productId = parseInt(paths[2], 10);
      const product = products.find((p) => p.productId === productId);

      if (product) {
        return (
          <ul>
            <li className="iconfont icon-home" style={{ display: "flex" }}>
              <div
                style={{
                  fontFamily:
                    "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
                  marginLeft: "5px",
                }}
              >
                <Link to="/">Home</Link>
              </div>
            </li>
            <li>
              <Link to={`/products/${product.category}`}>
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </Link>
            </li>
            {product.position && (
              <li>
                <Link to={`/products/${product.category}/${product.position}`}>
                  {product.position.charAt(0).toUpperCase() +
                    product.position.slice(1)}
                </Link>
              </li>
            )}
          </ul>
        );
      }
    }

    return null;
  };
  const menCategoryRef = useRef<HTMLDivElement>(null);
  const womenCategoryRef = useRef<HTMLDivElement>(null);
  const menSecondMenuRef = useRef<HTMLDivElement>(null);
  const womenSecondMenuRef = useRef<HTMLDivElement>(null);

  const menClose = () => {
    const menSecondMenu = menSecondMenuRef.current;
    if (menSecondMenu) {
      menSecondMenu.style.height = "0";
      menSecondMenu.style.padding = "0";
    }
  };

  const womenClose = () => {
    const womenSecondMenu = womenSecondMenuRef.current;
    if (womenSecondMenu) {
      womenSecondMenu.style.height = "0";
      womenSecondMenu.style.padding = "0";
    }
  };

  useEffect(() => {
    const menCategory = menCategoryRef.current;
    const womenCategory = womenCategoryRef.current;
    const menSecondMenu = menSecondMenuRef.current;
    const womenSecondMenu = womenSecondMenuRef.current;

    if (menCategory && womenCategory && menSecondMenu && womenSecondMenu) {
      const handleMenCategoryMouseOver = () => {
        menSecondMenu.style.height = "130px";
        menSecondMenu.style.padding = "0 10px";
        menSecondMenu.style.paddingBottom = "10px";
        womenSecondMenu.style.height = "0";
        womenSecondMenu.style.padding = "0";
      };

      const handleWomenCategoryMouseOver = () => {
        womenSecondMenu.style.height = "130px";
        womenSecondMenu.style.padding = "0 10px";
        womenSecondMenu.style.paddingBottom = "10px";
        menSecondMenu.style.height = "0";
        menSecondMenu.style.padding = "0";
      };

      const handleMenSecondMenuMouseLeave = () => {
        menClose();
      };

      const handleWomenSecondMenuMouseLeave = () => {
        womenClose();
      };

      const handleDocumentClick = (event: MouseEvent) => {
        if (
          menSecondMenu &&
          !menSecondMenu.contains(event.target as Node) &&
          !menCategory.contains(event.target as Node)
        ) {
          menClose();
        }
        if (
          womenSecondMenu &&
          !womenSecondMenu.contains(event.target as Node) &&
          !womenCategory.contains(event.target as Node)
        ) {
          womenClose();
        }
      };

      menCategory.addEventListener("mouseover", handleMenCategoryMouseOver);
      womenCategory.addEventListener("mouseover", handleWomenCategoryMouseOver);
      menSecondMenu.addEventListener(
        "mouseleave",
        handleMenSecondMenuMouseLeave
      );
      womenSecondMenu.addEventListener(
        "mouseleave",
        handleWomenSecondMenuMouseLeave
      );
      document.addEventListener("click", handleDocumentClick);

      return () => {
        menCategory.removeEventListener(
          "mouseover",
          handleMenCategoryMouseOver
        );
        womenCategory.removeEventListener(
          "mouseover",
          handleWomenCategoryMouseOver
        );
        menSecondMenu.removeEventListener(
          "mouseleave",
          handleMenSecondMenuMouseLeave
        );
        womenSecondMenu.removeEventListener(
          "mouseleave",
          handleWomenSecondMenuMouseLeave
        );
        document.removeEventListener("click", handleDocumentClick);
      };
    }
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <Link to="/">
            <img className="logo" src="/images/146855.png" alt="Logo" />
          </Link>
          <Link to="/">
            <div className="shop-name">Peter's Shop</div>
          </Link>
          <nav>
            <ul>
              <li>
                <div
                  ref={menCategoryRef}
                  className="men-category category-name"
                >
                  <Link to="/products/mens" onClick={menClose}>
                    Men
                  </Link>
                </div>
                <div
                  ref={menSecondMenuRef}
                  className="men-second-menu second-menu"
                >
                  <ul>
                    <li>
                      <Link to="/products/mens" onClick={menClose}>
                        All
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/mens/top" onClick={menClose}>
                        Top
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/mens/bottom" onClick={menClose}>
                        Bottom
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/mens/shoes" onClick={menClose}>
                        Shoes
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/mens/accessories" onClick={menClose}>
                        Accessories
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div
                  ref={womenCategoryRef}
                  className="women-category category-name"
                >
                  <Link to="/products/womens" onClick={womenClose}>
                    Women
                  </Link>
                </div>
                <div
                  ref={womenSecondMenuRef}
                  className="women-second-menu second-menu"
                >
                  <ul>
                    <li>
                      <Link to="/products/womens" onClick={womenClose}>
                        All
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/womens/top" onClick={womenClose}>
                        Top
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/womens/bottom" onClick={womenClose}>
                        Bottom
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/womens/shoes" onClick={womenClose}>
                        Shoes
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products/womens/accessories"
                        onClick={womenClose}
                      >
                        Accessories
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link className="category-name" to="/products/f&b">
                  F&B
                </Link>
              </li>
              <li>
                <Link className="category-name" to="/products/others">
                  Others
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="guide">
        <div className="container">{renderGuide()}</div>
      </div>
    </>
  );
};

export default Header;
