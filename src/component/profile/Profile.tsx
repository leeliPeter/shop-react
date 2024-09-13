import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { logout, clearUserInfoExceptCart } from "../../Redux/userInfoSlice";
import { useAppDispatch } from "../../Redux/hooks";
import { updateUserInfo } from "../../Redux/userInfoSlice";

import { Order, Item, url } from "../../ts/type";
import "./profile.css";

export default function Profile() {
  const dispatch = useAppDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const isLogin = useSelector((state: RootState) => state.isLogin);

  const navigate = useNavigate();

  const logOutRef = useRef<HTMLDivElement>(null);
  const [isLogOutActive, setIsLogOutActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isprofilePersonalInfo, setIsprofilePersonalInfo] = useState(false);

  useEffect(() => {
    // Redirect to home page if not logged in
    window.scrollTo(0, 0);
    if (!isLogin) {
      navigate("/");
    }
    // console.log("profile", userInfo);
  }, [isLogin, navigate]);

  useEffect(() => {
    // console.log("User Info:", userInfo);
  }, [userInfo]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logOutRef.current &&
        !logOutRef.current.contains(event.target as Node)
      ) {
        setIsLogOutActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logOutRef]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const handleLogOutClick = () => {
    setIsLogOutActive(true);
  };

  const handleNoClick = () => {
    setIsLogOutActive(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${url}/user/logout`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        dispatch(logout());
        dispatch(clearUserInfoExceptCart());
      } else {
        // console.log("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: userInfo.profile.firstName,
    lastName: userInfo.profile.lastName,
    birthday: userInfo.profile.birthday,
    gender: userInfo.profile.gender,
    phone: userInfo.profile.phone,
    state: userInfo.profile.state,
    zip: userInfo.profile.zip,
    country: userInfo.profile.country,
    city: userInfo.profile.city,
    address: userInfo.profile.address,
  });

  useEffect(() => {
    const profileOrder = document.querySelector(
      ".profile-order"
    ) as HTMLLIElement;
    const showOrder = document.querySelector(".show-order") as HTMLElement;
    const closeOrder = document.querySelector(".close-order") as HTMLElement;
    const orderHistory = document.querySelector(
      ".order-history"
    ) as HTMLElement;

    profileOrder?.addEventListener("click", function () {
      if (showOrder.classList.contains("hide")) {
        orderHistory.style.height = "0";
        orderHistory.style.overflow = "hidden";
        orderHistory.style.padding = "0";
        showOrder.classList.remove("hide");
        closeOrder.classList.add("hide");
        profileOrder.style.backgroundColor = "transparent";
      } else {
        orderHistory.style.height = "300px";
        orderHistory.style.padding = "10px";
        orderHistory.style.overflow = "auto";
        showOrder.classList.add("hide");
        closeOrder.classList.remove("hide");
        profileOrder.style.backgroundColor = "white";
      }
    });

    const profilePersonalInfo = document.querySelector(
      ".profile-personal-info"
    ) as HTMLLIElement;
    const showPersonalInfo = document.querySelector(
      ".show-personal-info"
    ) as HTMLElement;
    const closePersonalInfo = document.querySelector(
      ".close-personal-info"
    ) as HTMLElement;
    const personalInfo = document.querySelector(
      ".personal-info"
    ) as HTMLElement;

    profilePersonalInfo?.addEventListener("click", function () {
      if (showPersonalInfo.classList.contains("hide")) {
        // personalInfo.style.height = isEdit ? "730px" : "0";
        personalInfo.style.overflow = "hidden";
        personalInfo.style.padding = "0";
        showPersonalInfo.classList.remove("hide");
        closePersonalInfo.classList.add("hide");
        profilePersonalInfo.style.backgroundColor = "transparent";
        setIsprofilePersonalInfo(false);
      } else {
        // personalInfo.style.height = isEdit ? "730px" : "650px";
        // personalInfo.style.padding = "10px";
        showPersonalInfo.classList.add("hide");
        closePersonalInfo.classList.remove("hide");
        profilePersonalInfo.style.backgroundColor = "white";
        setIsprofilePersonalInfo(true);
      }
    });
  }, []);
  useEffect(() => {
    const infoContent = document.querySelector(".info-content") as HTMLElement;
    const editForm = document.querySelector(".edit-form") as HTMLFormElement;
    const personalInfo = document.querySelector(
      ".personal-info"
    ) as HTMLElement;
    if (isEdit && isprofilePersonalInfo) {
      infoContent.classList.add("hide");
      editForm.classList.remove("hide");
      personalInfo.style.height = "750px";
      personalInfo.style.padding = "15px";
    } else if (!isEdit && isprofilePersonalInfo) {
      infoContent.classList.remove("hide");
      editForm.classList.add("hide");
      personalInfo.style.height = "600px";
      personalInfo.style.padding = "15px";
    } else {
      // editForm.classList.add("hide");
      personalInfo.style.height = "0";
      personalInfo.style.padding = "0";
      // editForm.style.height = "0";
      // editForm.style.padding = "0";
    }
  }, [isEdit, isprofilePersonalInfo]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelChanges = () => {
    setFormData({
      firstName: userInfo.profile.firstName,
      lastName: userInfo.profile.lastName,
      birthday: userInfo.profile.birthday,
      gender: userInfo.profile.gender,
      phone: userInfo.profile.phone,
      state: userInfo.profile.state,
      zip: userInfo.profile.zip,
      country: userInfo.profile.country,
      city: userInfo.profile.city,
      address: userInfo.profile.address,
    });
    setIsEdit(false); // Close the edit form
  };

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Prepare the updated profile data
      const updatedProfile = {
        ...userInfo.profile,
        ...formData, // Assuming formData contains all necessary fields
      };
      // Dispatch the updateUserInfo action to update the Redux state and localStorage
      dispatch(updateUserInfo({ profile: updatedProfile }));
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="user-basic">
          <div className="greeting">
            <div
              className="logout-btn iconfont icon-log-out"
              onClick={handleLogOutClick}
            ></div>
            <div
              className={`log-out-container ${
                isLogOutActive ? "active" : "inactive"
              }`}
            >
              <div
                className={`log-out ${isLogOutActive ? "active" : "inactive"}`}
                ref={logOutRef}
              >
                <div className="question">
                  Are you sure you want to log out?
                </div>
                <div className="answer-btn">
                  <div
                    className="yes"
                    onClick={handleLogout}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleLogout()}
                  >
                    Yes
                  </div>
                  <div className="no" onClick={handleNoClick}>
                    No
                  </div>
                </div>
              </div>
            </div>
            <div className="user-icon">M</div>
            <div className="hi">
              <div>Good Morning</div>
              <div>{userInfo.name}</div>
            </div>
          </div>
          <div className="reg-date">
            You've been a member since {formatDate(userInfo.registerDate)}
          </div>
        </div>
        <div className="myaccount">
          <div className="account-title">My Account</div>
          <ul className="myaccount-nav">
            <li className="profile-order">
              <div>Orders ({userInfo.orderHistory.length})</div>
              <div className="iconfont show-order icon-arrow_r"></div>
              <div className="iconfont close-order icon-arrow_d hide"></div>
            </li>
            <div className="order-history">
              {userInfo.orderHistory.length === 0 ? (
                <ul className="empty-order-history">
                  <div className="iconfont icon-cart-empty"></div>
                  <div>Empty</div>
                </ul>
              ) : (
                <ul>
                  {userInfo.orderHistory.map((order: Order, index: number) => (
                    <li key={index} className="order">
                      <div className="order-num">
                        <div>Order ID :</div>
                        <div>{order.orderId}</div>
                      </div>
                      <ul>
                        {order.cart.map((item: Item, itemIndex: number) => (
                          <li key={itemIndex}>
                            <div className="item-size">
                              <div>{item.product.name}</div>
                              <div>Size : {item.size}</div>
                            </div>
                            <div className="quantity-price">
                              <div>Quantity : {item.quantity}</div>
                              {/* <div>${item.product.price}</div> */}
                              <div className="price">
                                {item.product.discount > 0 ? (
                                  <>
                                    {/* Display discounted price */}
                                    <div className="discount-price">
                                      $
                                      {(
                                        item.product.price *
                                        item.product.discount
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
                        <div>${order.totalPrice.toFixed(2)}</div>
                      </div>
                      <div className="order-date">
                        <div>Order date :</div>
                        <div>{new Date(order.date).toLocaleDateString()}</div>
                      </div>
                      <div className="order-status">
                        <div>Order status :</div>
                        <div className={`order-status ${order.status}`}>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <li className="profile-personal-info">
              <div className="profileWord">Profile</div>
              <div className="iconfont show-personal-info icon-arrow_r"></div>
              <div className="iconfont close-personal-info icon-arrow_d hide"></div>
            </li>
            <div className="personal-info">
              <ul className="info-content">
                <li className="email">
                  <div>Email</div>
                  <div>{userInfo.email || "-"}</div>
                </li>
                <li className="name">
                  <div className="f-name">
                    <div>First name</div>
                    <div>{userInfo.profile.firstName || "-"}</div>
                  </div>
                  <div className="l-name">
                    <div>Last name</div>
                    <div>{userInfo.profile.lastName || "-"}</div>
                  </div>
                </li>
                <li className="birth-gender">
                  <div className="birthday">
                    <div>Date of birth</div>
                    <div>{userInfo.profile.birthday || "-"}</div>
                  </div>
                  <div className="gender">
                    <div>Gender</div>
                    <div>{userInfo.profile.gender || "-"}</div>
                  </div>
                </li>
                <li className="phone">
                  <div>Phone</div>
                  <div>
                    <div>{userInfo.profile.phone || "-"}</div>
                  </div>
                </li>
                <li className="country-city">
                  <div className="country">
                    <div>Country</div>
                    <div>{userInfo.profile.country || "-"}</div>
                  </div>
                  <div className="state">
                    <div>State</div>
                    <div>{userInfo.profile.state || "-"}</div>
                  </div>
                </li>
                <li className="state-zip">
                  <div className="city">
                    <div>City</div>
                    <div>{userInfo.profile.city || "-"}</div>
                  </div>
                  <div className="zip">
                    <div>Zip</div>
                    <div>{userInfo.profile.zip || "-"}</div>
                  </div>
                </li>
                <li className="address">
                  <div>Address</div>
                  <div>{userInfo.profile.address || "-"}</div>
                </li>
                <div
                  className="edit"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  <div>Edit your details</div>
                  <div className="iconfont icon-edit"></div>
                </div>
              </ul>

              <form className="edit-form hide" onSubmit={handleSaveChanges}>
                <ul>
                  <li className="email">
                    <label htmlFor="email">Email</label>
                    <input
                      disabled
                      type="email"
                      id="email"
                      name="email"
                      value={userInfo.email}
                    />
                  </li>
                  <li className="name">
                    <div className="f-name">
                      <label htmlFor="first-name">First name</label>
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="l-name">
                      <label htmlFor="last-name">Last name</label>
                      <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </li>
                  <li className="birth-gender">
                    <div className="birthday">
                      <label htmlFor="birth-date">Date of birth</label>
                      <input
                        type="date"
                        id="birth-date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="gender">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </li>
                  <li className="phone">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </li>
                  <li className="state-zip">
                    <div className="state">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="zip">
                      <label htmlFor="zip">Zip</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </li>
                  <li className="country-city">
                    <div className="country">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="city">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </li>
                  <li className="address">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </li>
                </ul>
                <div className="button-container">
                  <button
                    type="button"
                    className="cancel-change-button"
                    onClick={handleCancelChanges}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-change-button">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
