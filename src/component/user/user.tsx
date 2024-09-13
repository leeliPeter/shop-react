import React, { useEffect, useRef, useState } from "react";
import { Product } from "../../ts/type";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { updateCart } from "../../Redux/userInfoSlice";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./user.css";

const User: React.FC = () => {
  const { cart } = useAppSelector((state) => state.userInfo);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const products = useAppSelector((state) => state.products.products); // Access products from Redux state
  const isLogin = useAppSelector((state) => state.isLogin);
  const dispatch = useAppDispatch();

  const cartIconRef = useRef<HTMLSpanElement>(null);
  const cartContainerRef = useRef<HTMLDivElement>(null);

  const [quantityReminders, setQuantityReminders] = useState<boolean[]>([]);

  useEffect(() => {
    const cartIcon = cartIconRef.current;
    const cartContainer = cartContainerRef.current;

    if (cartIcon && cartContainer) {
      const handleCartIconClick = () => {
        if (
          cartContainer.style.height === "0px" ||
          cartContainer.style.height === ""
        ) {
          cartContainer.style.padding = "20px";
          cartContainer.style.height = "550px";
        } else {
          cartContainer.style.padding = "0";
          cartContainer.style.height = "0";
        }
      };

      const handleDocumentClick = (event: MouseEvent) => {
        if (
          cartContainer &&
          cartIcon &&
          !cartContainer.contains(event.target as Node) &&
          !cartIcon.contains(event.target as Node)
        ) {
          cartContainer.style.padding = "0";
          cartContainer.style.height = "0";
        }
      };

      cartIcon.addEventListener("click", handleCartIconClick);
      document.addEventListener("click", handleDocumentClick);

      return () => {
        cartIcon.removeEventListener("click", handleCartIconClick);
        document.removeEventListener("click", handleDocumentClick);
      };
    }
  }, []);

  const handleCheckoutClick = () => {
    if (cartContainerRef.current) {
      cartContainerRef.current.style.padding = "0";
      cartContainerRef.current.style.height = "0";
    }
  };

  const getProductById = (productId: number): Product | undefined => {
    return products.find((item) => item.productId === productId);
  };

  const incrementQuantity = (index: number) => {
    const item = cart[index];
    const product = getProductById(item.product.productId);

    if (product) {
      const maxQuantity =
        product.quantity.find((q) => q.size === item.size)?.quantity || 0;

      if (item.quantity < maxQuantity) {
        const newCart = [...cart];
        newCart[index] = {
          ...item,
          quantity: item.quantity + 1,
        };

        const newReminders = [...quantityReminders];
        newReminders[index] = false;

        setQuantityReminders(newReminders);
        dispatch(updateCart(newCart));
      } else {
        const newReminders = [...quantityReminders];
        newReminders[index] = true;

        setQuantityReminders(newReminders);
      }
    }
  };

  const decrementQuantity = (index: number) => {
    const item = cart[index];

    if (item.quantity > 1) {
      const newCart = [...cart];
      newCart[index] = {
        ...item,
        quantity: item.quantity - 1,
      };

      const product = getProductById(item.product.productId);
      const maxQuantity =
        product?.quantity.find((q) => q.size === item.size)?.quantity || 0;

      const newReminders = [...quantityReminders];
      if (item.quantity - 1 < maxQuantity) {
        newReminders[index] = false;
      }

      setQuantityReminders(newReminders);
      dispatch(updateCart(newCart));
    }
  };

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    dispatch(updateCart(newCart));

    const newReminders = quantityReminders.filter((_, i) => i !== index);
    setQuantityReminders(newReminders);
  };
  const totalCost = cart.reduce((total, item) => {
    const itemPrice = item.product.discount
      ? item.product.price * item.product.discount
      : item.product.price;
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="user">
      <div className="container">
        <span
          ref={cartIconRef}
          className="iconfont icon-cart-empty cart-logo logo"
        >
          <span className="cart-number">{cart.length}</span>
        </span>
        {isLogin ? (
          <Link to="/profile">
            <div className="user-icon">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <span className="iconfont icon-user logo"></span>
          </Link>
        )}
        <div ref={cartContainerRef} className="cart-container">
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              <div className="iconfont icon-cart-empty"></div>
              <div>The cart is empty</div>
            </div>
          ) : (
            <>
              <div className="cart-items">
                <div className="cart-title">Your cart</div>
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
                          <div className="product-name">
                            {item.product.name}
                          </div>
                          <div>
                            {item.product.discount > 0 && (
                              <span className="discount-price">
                                $
                                {(item.product.price * item.product.discount) // Adjusted to reflect discounted price
                                  .toFixed(2)}
                              </span>
                            )}

                            <span
                              className={`product-price ${
                                item.product.discount ? "abandoned-price" : ""
                              }`}
                            >
                              ${item.product.price}
                            </span>
                          </div>
                        </div>
                        <div className="category">{item.product.category}</div>
                        <div className="size">{item.size}</div>
                        <div className="quantity-del">
                          <div className="quantity-button">
                            <span
                              className="iconfont icon-minus"
                              onClick={() => decrementQuantity(index)}
                            ></span>
                            <span className="quantity-number">
                              {item.quantity}
                            </span>
                            <span
                              className="iconfont icon-add"
                              onClick={() => incrementQuantity(index)}
                            ></span>
                          </div>
                          {quantityReminders[index] && (
                            <span className="quantityReminder">
                              Maximum available quantity reached
                            </span>
                          )}
                          <div
                            className="delete iconfont icon-del"
                            onClick={() => removeItem(index)}
                          ></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cart-check-out">
                <div>
                  <div className="total">
                    <div>Total</div>
                    <div>${totalCost.toFixed(2)}</div>
                  </div>
                  <Link to="/check-out" onClick={handleCheckoutClick}>
                    <div className="check-out">Check out</div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
