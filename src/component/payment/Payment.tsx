import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./payment.css";

export default function Payment() {
  const { orderId } = useParams<{ orderId: string }>(); // Extract orderId from URL
  const [order, setOrder] = useState<any>(null); // State to store the order data

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3001/order/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const orderData = await response.json();
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  // Destructure order data
  const { buyerInfo, cart, totalPrice, date } = order;

  return (
    <div className="payment">
      <div className="container">
        <div className="title">Success! One Step Away</div>
        <div className="icon-container">
          <div className="shipping">
            <div>1</div>
            <div>SHIPPING</div>
          </div>
          <div className="line"></div>
          <div className="iconfont icon-done-01"></div>
          <div className="line"></div>
          <div className="payment">
            <div>2</div>
            <div>PAYMENT</div>
          </div>
        </div>
        <div className="confirm-info">
          <div className="personal-info">
            <ul>
              <li>
                <div>Email</div>
                <div>{buyerInfo.email}</div>
              </li>
              <div className="fl-name">
                <li>
                  <div>First name</div>
                  <div>{buyerInfo.firstName}</div>
                </li>
                <li>
                  <div>Last name</div>
                  <div>{buyerInfo.lastName}</div>
                </li>
              </div>

              <div className="city-state">
                <li>
                  <div>City</div>
                  <div>{buyerInfo.city}</div>
                </li>
                <li>
                  <div>State</div>
                  <div>{buyerInfo.state}</div>
                </li>
              </div>
              <div className="country-post">
                <li>
                  <div>Country</div>
                  <div>{buyerInfo.country}</div>
                </li>
                <li>
                  <div>Post Code</div>
                  <div>{buyerInfo.zip}</div>
                </li>
              </div>
              <li>
                <div>Address</div>
                <div>{buyerInfo.address}</div>
              </li>
              <li>
                <div>Phone</div>
                <div>{buyerInfo.phone}</div>
              </li>
            </ul>
          </div>
          <div className="cart">
            <div className="order-num">
              <div>Order ID :</div>
              <div>{orderId}</div>
            </div>
            <ul>
              {cart.map((item: any, index: number) => (
                <li key={index}>
                  <div className="item-size">
                    <div>{item.product.name}</div>
                    <div>Size : {item.size}</div>
                  </div>
                  <div className="quantity-price">
                    <div>Quantity : {item.quantity}</div>
                    <div className="price">
                      {item.product.discount > 0 ? (
                        <>
                          {/* Display discounted price */}
                          <div className="discount-price">
                            $
                            {(
                              item.product.price * item.product.discount
                            ).toFixed(2)}
                          </div>
                          {/* Display original price as abandoned price */}
                          <div className="abandoned-price origin-price">
                            ${item.product.price.toFixed(2)}
                          </div>
                        </>
                      ) : (
                        /* Display original price if no discount */
                        <div>${item.product.price.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="order-item-total">
              <div>Total :</div>
              <div>${totalPrice.toFixed(2)}</div>
            </div>
            <div className="order-date">
              <div>Order date :</div>
              <div>{new Date(date).toLocaleDateString()}</div>
            </div>
            <div className="order-status">
              <div>Order status :</div>
              <div className={`order-status ${order.status}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>
          </div>
        </div>
        <div className="next-step">
          <div className="next-step-title">
            <div className="line"></div>
            <div>Next Step</div>
            <div className="line"></div>
          </div>
          <div className="sentence">
            In order to process your order, please e-transfer the total amount
            <span className="amount">${totalPrice.toFixed(2)}</span> to
            <span className="email">lei23lei91@gmail.com</span> and include your
            order ID: <span className="order-id">{orderId}</span> in the message
            section.
          </div>
        </div>
      </div>
    </div>
  );
}
