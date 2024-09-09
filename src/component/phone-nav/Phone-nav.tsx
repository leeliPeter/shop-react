import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { updateCart } from "../../Redux/userInfoSlice";
import "./phone-nav.css";

export default function PhoneNav() {
  const { cart } = useAppSelector((state) => state.userInfo);
  const isLogin = useAppSelector((state) => state.isLogin);
  const userInfo = useAppSelector((state) => state.userInfo);
  const products = useAppSelector((state) => state.products.products); // Access products from Redux state
  const dispatch = useAppDispatch();
  const [quantityReminders, setQuantityReminders] = useState<boolean[]>([]);

  useEffect(() => {
    const phoneShowMenu = document.querySelector(
      ".phone-show-menu"
    ) as HTMLElement;
    const phoneCloseMenu = document.querySelector(
      ".phone-close-menu"
    ) as HTMLElement;
    const popupNav = document.querySelector(".popup-nav") as HTMLElement;
    const phoneShowCart = document.querySelector(
      ".phone-show-cart"
    ) as HTMLElement;
    const phoneCloseCart = document.querySelector(
      ".phone-close-cart"
    ) as HTMLElement;
    const popupCart = document.querySelector(".popup-cart") as HTMLElement;
    const phoneNavMen = document.querySelector(".phone-nav-men") as HTMLElement;
    const phoneNavWomen = document.querySelector(
      ".phone-nav-women"
    ) as HTMLElement;
    const menItem = document.querySelector(".men-items") as HTMLElement;
    const womenItem = document.querySelector(".women-items") as HTMLElement;
    const menSwitchIcon = document.querySelector(
      ".menSwitchIcon"
    ) as HTMLElement;
    const womenSwitchIcon = document.querySelector(
      ".womenSwitchIcon"
    ) as HTMLElement;

    const closeMenu = () => {
      phoneCloseMenu.classList.add("hide");
      phoneShowMenu.classList.remove("hide");
      popupNav.style.height = "0vh";
      popupNav.style.padding = "0";
    };

    const closeCart = () => {
      phoneCloseCart.classList.add("hide");
      phoneShowCart.classList.remove("hide");
      popupCart.style.height = "0vh";
    };

    phoneShowMenu?.addEventListener("click", function () {
      phoneShowMenu.classList.add("hide");
      phoneCloseMenu.classList.remove("hide");
      popupNav.style.height = "100vh";
      popupNav.style.padding = "20px 0";
      closeCart();
    });

    phoneCloseMenu?.addEventListener("click", closeMenu);

    phoneShowCart?.addEventListener("click", function () {
      popupCart.style.height = "100vh";
      phoneShowCart.classList.add("hide");
      phoneCloseCart.classList.remove("hide");
      closeMenu();
    });

    phoneCloseCart?.addEventListener("click", closeCart);

    phoneNavMen?.addEventListener("click", function () {
      menSwitchIcon.classList.toggle("icon-add");
      if (menItem.style.height === "170px") {
        menItem.style.height = "0";
        menItem.style.padding = "0 30px";
      } else {
        menItem.style.height = "170px";
        menItem.style.padding = "5px 30px";
        womenSwitchIcon.classList.add("icon-add");
        womenItem.style.height = "0";
        womenItem.style.padding = "0 30px";
      }
    });

    phoneNavWomen?.addEventListener("click", function () {
      womenSwitchIcon.classList.toggle("icon-add");
      if (womenItem.style.height === "170px") {
        womenItem.style.height = "0";
        womenItem.style.padding = "0 30px";
      } else {
        womenItem.style.height = "170px";
        womenItem.style.padding = "5px 30px";
        menSwitchIcon.classList.add("icon-add");
        menItem.style.height = "0";
        menItem.style.padding = "0 30px";
      }
    });

    return () => {
      phoneShowMenu?.removeEventListener("click", closeMenu);
      phoneCloseMenu?.removeEventListener("click", closeMenu);
      phoneShowCart?.removeEventListener("click", closeCart);
      phoneCloseCart?.removeEventListener("click", closeCart);
      phoneNavMen?.removeEventListener("click", closeMenu);
      phoneNavWomen?.removeEventListener("click", closeMenu);
    };
  }, []);

  const closeMenu = () => {
    const phoneShowMenu = document.querySelector(
      ".phone-show-menu"
    ) as HTMLElement;
    const phoneCloseMenu = document.querySelector(
      ".phone-close-menu"
    ) as HTMLElement;
    const popupNav = document.querySelector(".popup-nav") as HTMLElement;
    phoneCloseMenu.classList.add("hide");
    phoneShowMenu.classList.remove("hide");
    popupNav.style.height = "0vh";
    popupNav.style.padding = "0";
  };

  const closeCart = () => {
    const phoneShowCart = document.querySelector(
      ".phone-show-cart"
    ) as HTMLElement;
    const phoneCloseCart = document.querySelector(
      ".phone-close-cart"
    ) as HTMLElement;
    const popupCart = document.querySelector(".popup-cart") as HTMLElement;
    phoneCloseCart.classList.add("hide");
    phoneShowCart.classList.remove("hide");
    popupCart.style.height = "0vh";
  };

  const handleLoginBtn = () => {
    closeMenu();
    closeCart();
  };

  const incrementQuantity = (productId: number, size: string) => {
    const updatedCart = cart.map((item, index) => {
      if (item.product.productId === productId && item.size === size) {
        const product = products.find((p) => p.productId === productId);
        const maxQuantity =
          product?.quantity.find((q) => q.size === size)?.quantity || 0;

        // Clear the reminder if quantity is less than max
        const newReminders = [...quantityReminders];
        if (item.quantity < maxQuantity) {
          newReminders[index] = false;
          setQuantityReminders(newReminders);
          return { ...item, quantity: item.quantity + 1 };
        } else {
          // Show the reminder if max quantity is reached
          newReminders[index] = true;
          setQuantityReminders(newReminders);
        }
      }
      return item;
    });

    dispatch(updateCart(updatedCart));
  };

  const decrementQuantity = (productId: number, size: string) => {
    const updatedCart = cart.map((item, index) => {
      if (item.product.productId === productId && item.size === size) {
        const newQuantity = Math.max(item.quantity - 1, 1);

        // Clear the reminder if quantity is less than max
        const product = products.find((p) => p.productId === productId);
        const maxQuantity =
          product?.quantity.find((q) => q.size === size)?.quantity || 0;

        const newReminders = [...quantityReminders];
        if (newQuantity < maxQuantity) {
          newReminders[index] = false;
          setQuantityReminders(newReminders);
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    dispatch(updateCart(updatedCart));
  };

  const deleteItem = (productId: number, size: string) => {
    const updatedCart = cart.filter(
      (item) => !(item.product.productId === productId && item.size === size)
    );
    dispatch(updateCart(updatedCart));
  };
  const handleIconUser = () => {
    closeMenu();
    closeCart();
  };
  return (
    <div className="phone-nav">
      <div className="container">
        <span className="iconfont icon-cart-empty phone-show-cart">
          <span className="cart-quantity">{cart.length}</span>
        </span>
        <span className="iconfont icon-close phone-close-cart hide"></span>
        {!isLogin ? (
          <Link to="/login" onClick={handleLoginBtn}>
            <span className="iconfont icon-user"></span>
          </Link>
        ) : (
          <Link to="/profile" onClick={handleIconUser}>
            <div className="user-icon">
              {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : ""}
            </div>
          </Link>
        )}
        <span className="iconfont icon-more_ phone-show-menu"></span>
        <span className="iconfont icon-close phone-close-menu hide"></span>
      </div>
      <div className="popup-nav">
        <ul className="popup-menu-items">
          <li>
            <div className="category phone-nav-men">
              Men
              <div className="menSwitchIcon iconfont icon-add icon-minus"></div>
            </div>
          </li>
          <li className="items men-items">
            <ul>
              <li>
                <Link to="/products/mens" onClick={closeMenu}>
                  All
                </Link>
              </li>
              <li>
                <Link to="/products/mens/top" onClick={closeMenu}>
                  Top
                </Link>
              </li>
              <li>
                <Link to="/products/mens/bottom" onClick={closeMenu}>
                  Bottom
                </Link>
              </li>
              <li>
                <Link to="/products/mens/shoes" onClick={closeMenu}>
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/products/mens/accessories" onClick={closeMenu}>
                  Accessories
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="category phone-nav-women">
              <div>Women</div>
              <div className="womenSwitchIcon iconfont icon-add icon-minus"></div>
            </div>
          </li>
          <li className="items women-items">
            <ul>
              <li>
                <Link to="/products/womens" onClick={closeMenu}>
                  All
                </Link>
              </li>
              <li>
                <Link to="/products/womens/top" onClick={closeMenu}>
                  Top
                </Link>
              </li>
              <li>
                <Link to="/products/womens/bottom" onClick={closeMenu}>
                  Bottom
                </Link>
              </li>
              <li>
                <Link to="/products/womens/shoes" onClick={closeMenu}>
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/products/womens/accessories" onClick={closeMenu}>
                  Accessories
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/products/f&b" onClick={closeMenu}>
              <div className="category">
                <div>F&B</div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/products/others" onClick={closeMenu}>
              <div className="category">
                <div>Others</div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="popup-cart">
        <div className="phone-cart-container">
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              <div className="iconfont icon-cart-empty"></div>
              <div>The cart is empty</div>
            </div>
          ) : (
            <div className="cart-items">
              <div className="cart-title">Your cart</div>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    <div className="image">
                      <Link
                        to={`/detail/${item.product.productId}`}
                        onClick={closeCart}
                      >
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
                          <span className="discount-price">
                            $
                            {(item.product.price * item.product.discount) // Adjusted to reflect discounted price
                              .toFixed(2)}
                          </span>
                        )}
                      </div>
                      {/* <div className="category">{item.product.category}</div> */}
                      <div className="size">
                        {item.size}{" "}
                        {quantityReminders[index] ? (
                          <span className="quantityReminder">
                            Maximum available quantity reached
                          </span>
                        ) : null}
                      </div>

                      <div className="quantity-del">
                        <div className="quantity-button">
                          <span
                            className="iconfont icon-minus"
                            onClick={() =>
                              decrementQuantity(
                                item.product.productId,
                                item.size
                              )
                            }
                          ></span>
                          <span className="quantity-number">
                            {item.quantity}
                          </span>
                          <span
                            className="iconfont icon-add"
                            onClick={() =>
                              incrementQuantity(
                                item.product.productId,
                                item.size
                              )
                            }
                          ></span>
                        </div>
                        <div
                          className="delete iconfont icon-del"
                          onClick={() =>
                            deleteItem(item.product.productId, item.size)
                          }
                        ></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cart.length > 0 && (
            <div className="cart-check-out">
              <div>
                <div className="total">
                  <div>Total</div>
                  <div>
                    $
                    {cart
                      .reduce((total, item) => {
                        const discountedPrice = item.product.discount
                          ? item.product.price * item.product.discount
                          : item.product.price;
                        return total + discountedPrice * item.quantity;
                      }, 0)
                      .toFixed(2)}
                  </div>
                </div>
                <Link to="/check-out" onClick={closeCart}>
                  <div className="check-out">Check out</div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
