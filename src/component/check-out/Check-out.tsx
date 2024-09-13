import { useEffect, useState } from "react";
import { useAppSelector } from "../../Redux/hooks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useAppDispatch } from "../../Redux/hooks";
import { addOrderToHistory, clearCart } from "../../Redux/userInfoSlice";
import { url } from "../../ts/type";

import "./check-out.css";

export default function CheckOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { cart } = useAppSelector((state) => state.userInfo);
  const userInfo = useAppSelector((state: RootState) => state.userInfo);
  useEffect(() => {
    console.log("check-out", userInfo);
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

  const [formData, setFormData] = useState({
    email: userInfo.email,
    firstName: userInfo.profile.firstName,
    lastName: userInfo.profile.lastName,
    address: userInfo.profile.address,
    city: userInfo.profile.city,
    state: userInfo.profile.state,
    country: userInfo.profile.country,
    zip: userInfo.profile.zip,
    phone: userInfo.profile.phone,
  });

  useEffect(() => {
    setFormData({
      email: userInfo.email,
      firstName: userInfo.profile.firstName,
      lastName: userInfo.profile.lastName,
      address: userInfo.profile.address,
      city: userInfo.profile.city,
      state: userInfo.profile.state,
      country: userInfo.profile.country,
      zip: userInfo.profile.zip,
      phone: userInfo.profile.phone,
    });
  }, [userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique orderId
    const orderId = new Date().getTime();

    const orderData = {
      orderId, // Include the generated orderId
      cart: cart,
      userId: userInfo.userId || "", // Optionally set userId to an empty string if not logged in
      status: "unpaid",
      date: new Date().toISOString(),
      totalPrice: total,
      buyerInfo: formData,
    };

    try {
      const response = await fetch(`${url}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Order submitted successfully:", result);

      // Update order history in Redux store if the user is logged in
      if (userInfo.userId) {
        console.log("add order to history", result.order);
        dispatch(addOrderToHistory(result.order));
      }
      dispatch(clearCart());
      navigate(`/payment/${orderId}`);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error (e.g., show an error message)
    }
  };

  // Calculate the total price of the items in the cart
  const total = cart.reduce((sum, item) => {
    // Calculate the price after discount, if any
    const discountedPrice = item.product.discount
      ? item.product.price * item.product.discount
      : item.product.price;

    // Add the discounted price multiplied by quantity to the sum
    return sum + discountedPrice * item.quantity;
  }, 0);

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
                    <div
                      className={`product-price ${
                        item.product.discount ? "abandoned-price" : ""
                      }`}
                    >
                      ${item.product.price}
                    </div>
                  </div>
                  {/* <div className="category">{item.product.category}</div> */}
                  <div className="category-discount-price">
                    <div className="category">{item.product.category}</div>
                    {item.product.discount > 0 && (
                      <div className="discount-price">
                        ${item.product.discount * item.product.price}
                      </div>
                    )}
                  </div>
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
          <form onSubmit={handleSubmit}>
            <legend>Email</legend>
            <input
              type="email"
              name="email"
              required
              value={formData.email === "-" ? "" : formData.email}
              onChange={handleInputChange}
            />

            <div className="f-l-name">
              <div>
                <legend>First name</legend>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName === "-" ? "" : formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <legend>Last name</legend>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName === "-" ? "" : formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* <legend>City</legend>
            <input
              type="text"
              name="city"
              required
              value={formData.city === "-" ? "" : formData.city}
              onChange={handleInputChange}
            /> */}
            <div className="city-state">
              <div className="city">
                <legend>City</legend>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city === "-" ? "" : formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="state">
                <legend>State</legend>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state === "-" ? "" : formData.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="country-code">
              <div className="country">
                <legend>Country</legend>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country === "-" ? "" : formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="post">
                <legend>Post Code</legend>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip === "-" ? "" : formData.zip}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <legend>Address</legend>
            <input
              type="text"
              name="address"
              required
              value={formData.address === "-" ? "" : formData.address}
              onChange={handleInputChange}
            />

            <legend>Phone</legend>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone === "-" ? "" : formData.phone}
              onChange={handleInputChange}
            />

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
                    <div
                      className={`product-price ${
                        item.product.discount ? "abandoned-price" : ""
                      }`}
                    >
                      ${item.product.price}
                    </div>
                  </div>
                  <div className="category-discount-price">
                    <div className="category">{item.product.category}</div>
                    {item.product.discount > 0 && (
                      <div className="discount-price">
                        ${item.product.discount * item.product.price}
                      </div>
                    )}
                  </div>
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
              <div>Total :</div>
              <div>${total.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
