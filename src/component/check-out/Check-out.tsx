import { useEffect } from "react";
import { useAppSelector } from "../../Redux/hooks";
import { Link } from "react-router-dom";
import "./check-out.css";

export default function CheckOut() {
  const { cart } = useAppSelector((state) => state.userInfo);

  useEffect(() => {
    const cartNav = document.querySelector<HTMLDivElement>(".cart-nav");
    const showCheckOutCart = document.querySelector<HTMLDivElement>(
      ".show-check-out-cart"
    );
    const closeCheckOutCart = document.querySelector<HTMLDivElement>(
      ".close-check-out-cart"
    );
    const checkOutPhoneCartContainer = document.querySelector<HTMLDivElement>(
      ".check-out-phone-cart-container"
    );

    if (
      !cartNav ||
      !showCheckOutCart ||
      !closeCheckOutCart ||
      !checkOutPhoneCartContainer
    )
      return;

    const handleCartNavClick = () => {
      if (checkOutPhoneCartContainer.style.height === "350px") {
        checkOutPhoneCartContainer.style.height = "0";
        cartNav.style.backgroundColor = "transparent";
        showCheckOutCart.classList.remove("hide");
        closeCheckOutCart.classList.add("hide");
      } else {
        checkOutPhoneCartContainer.style.height = "350px";
        cartNav.style.backgroundColor = "white";
        showCheckOutCart.classList.add("hide");
        closeCheckOutCart.classList.remove("hide");
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        !checkOutPhoneCartContainer.contains(event.target as Node) &&
        !cartNav.contains(event.target as Node)
      ) {
        checkOutPhoneCartContainer.style.height = "0";
        cartNav.style.backgroundColor = "transparent";
        showCheckOutCart.classList.remove("hide");
        closeCheckOutCart.classList.add("hide");
      }
    };

    cartNav.addEventListener("click", handleCartNavClick);
    document.addEventListener("click", handleClickOutside);

    return () => {
      cartNav.removeEventListener("click", handleCartNavClick);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Calculate the total price of the items in the cart
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="check-out-page">
      <div className="phone-cart">
        <div className="cart-nav">
          <div>My cart</div>
          <div className="iconfont show-check-out-cart icon-arrow_r"></div>
          <div className="iconfont close-check-out-cart icon-arrow_d hide"></div>
        </div>
        <div className="check-out-phone-cart-container">
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <div className="image">
                  <Link to={`/detail/${item.product.productId}`}>
                    <img src={item.product.image[0]} alt="" />
                  </Link>
                </div>
                <div className="product-info">
                  <div className="name-price">
                    <div className="product-name">{item.product.name}</div>
                    <div className="product-price">${item.product.price}</div>
                  </div>
                  <div className="category">{item.product.category}</div>
                  <div className="size">Size: {item.size}</div>
                  <div className="quantity-del">
                    <div className="quantity-button">
                      <span className="quantity-number">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-check-out">
            <div className="total">
              <div>Total</div>
              <div>${total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="check-out-form">
          <div className="check-out-logo">
            <div className="shipping-logo">
              <div className="logo">1</div>
              <div>SHIPPING</div>
            </div>
            <hr />
            <div className="payment-logo">
              <div className="logo">2</div>
              <div>PAYMENT</div>
            </div>
          </div>
          <div className="title">Shipping</div>
          <form action="#">
            <legend>Email</legend>
            <input type="email" name="email" required />
            <div className="f-l-name">
              <div>
                <legend>First name</legend>
                <input type="text" name="first-name" required />
              </div>
              <div>
                <legend>Last name</legend>
                <input type="text" name="last-name" required />
              </div>
            </div>
            <legend>Address</legend>
            <input type="text" name="address" required />
            <legend>City</legend>
            <input type="text" name="city" required />
            <div className="country-code">
              <div className="country">
                <legend>Country</legend>
                <input type="text" name="country" required />
              </div>
              <div className="post">
                <legend>Post Code</legend>
                <input type="text" name="post-code" required />
              </div>
            </div>
            <legend>Phone</legend>
            <input type="tel" name="phone" required />
            <button type="submit" className="next-step">
              Next Step
            </button>
          </form>
        </div>
        <div className="check-out-cart">
          <div className="cart-title">My cart</div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <div className="image">
                  <Link to={`/detail/${item.product.productId}`}>
                    <img src={item.product.image[0]} alt="" />
                  </Link>
                </div>
                <div className="product-info">
                  <div className="name-price">
                    <div className="product-name">{item.product.name}</div>
                    <div className="product-price">${item.product.price}</div>
                  </div>
                  <div className="category">{item.product.category}</div>
                  <div className="size">Size: {item.size}</div>
                  <div className="quantity-del">
                    <div className="quantity-button">
                      Quantity:
                      <span className="quantity-number">{item.quantity}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-check-out">
            <div className="total">
              <div>Total</div>
              <div>${total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
