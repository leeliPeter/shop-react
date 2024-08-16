import { useState, useEffect, ChangeEvent } from "react";
import "./profile.css";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    phone: "",
    country: "",
    city: "",
    address: "",
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
        personalInfo.style.height = "0";
        personalInfo.style.overflow = "hidden";
        personalInfo.style.padding = "0";
        showPersonalInfo.classList.remove("hide");
        closePersonalInfo.classList.add("hide");
        profilePersonalInfo.style.backgroundColor = "transparent";
      } else {
        personalInfo.style.height = "630px";
        personalInfo.style.padding = "10px";
        showPersonalInfo.classList.add("hide");
        closePersonalInfo.classList.remove("hide");
        profilePersonalInfo.style.backgroundColor = "white";
      }
    });

    const profileEdit = document.querySelector(".edit") as HTMLDivElement;
    const infoContent = document.querySelector(".info-content") as HTMLElement;
    const editForm = document.querySelector(".edit-form") as HTMLFormElement;

    profileEdit?.addEventListener("click", function () {
      infoContent.classList.add("hide");
      profileEdit.style.display = "none";
      editForm.classList.remove("hide");
      personalInfo.style.height = "630px";
    });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="user-basic">
          <div className="greeting">
            <div className="user-icon">M</div>
            <div className="hi">
              <div>Good Morning</div>
              <div>lei23lei91@gmail.com</div>
            </div>
          </div>
          <div className="reg-date">
            You've been a member of MyShop since July 2024
          </div>
        </div>
        <div className="myaccount">
          <div className="account-title">My Account</div>
          <ul className="myaccount-nav">
            <li className="profile-order">
              <div>Orders(1)</div>
              <div className="iconfont show-order icon-arrow_r"></div>
              <div className="iconfont close-order icon-arrow_d hide"></div>
            </li>
            <div className="order-history">
              <ul>
                <li>
                  <div className="order-number">Order number:123</div>
                  <ul className="order-item">
                    <li>
                      <div className="item-number">backpack * 1</div>
                      <div className="item-price">200</div>
                    </li>
                    <li>
                      <div className="item-number">MYD backpack * 1</div>
                      <div className="item-price">100</div>
                    </li>
                  </ul>
                  <div className="order-item-total">Total $100</div>
                </li>
              </ul>
            </div>
            <li className="profile-personal-info">
              <div>Profile</div>
              <div className="iconfont show-personal-info icon-arrow_r"></div>
              <div className="iconfont close-personal-info icon-arrow_d hide"></div>
            </li>
            <div className="personal-info">
              <ul className="info-content">
                <li className="email">
                  <div>Email</div>
                  <div>lei23lei91@gmail.com</div>
                </li>
                <li className="name">
                  <div className="f-name">
                    <div>First name</div>
                    <div>-</div>
                  </div>
                  <div className="l-name">
                    <div>Last name</div>
                    <div>-</div>
                  </div>
                </li>
                <li className="birth-gender">
                  <div className="birthday">
                    <div>Date of birth</div>
                    <div>-</div>
                  </div>
                  <div className="gender">
                    <div>Gender</div>
                    <div>-</div>
                  </div>
                </li>
                <li className="phone">
                  <div>Phone</div>
                  <div>
                    <div>-</div>
                  </div>
                </li>
                <li className="country-city">
                  <div className="country">
                    <div>Country</div>
                    <div>-</div>
                  </div>
                  <div className="city">
                    <div>City</div>
                    <div>-</div>
                  </div>
                </li>
                <li className="address">
                  <div>Address</div>
                  <div>-</div>
                </li>
              </ul>
              <div className="edit">
                <div>Edit your details</div>
                <div className="iconfont icon-edit"></div>
              </div>
              <form className="edit-form hide">
                <ul>
                  <li className="email">
                    <label htmlFor="email">Email</label>
                    <input
                      disabled
                      type="email"
                      id="email"
                      name="email"
                      value="lei23lei91@gmail.com"
                    />
                  </li>
                  <li className="name">
                    <div className="f-name">
                      <label htmlFor="first-name">First name</label>
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="l-name">
                      <label htmlFor="last-name">Last name</label>
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </li>
                  <li className="birth-gender">
                    <div className="birthday">
                      <label htmlFor="birth-date">Date of birth</label>
                      <input
                        type="date"
                        id="birth-date"
                        name="birth-date"
                        value={formData.birthDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="gender">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
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
                    />
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
                    />
                  </li>
                </ul>
                <div className="button-container">
                  <button type="button" className="cancel-change-button">
                    Cancel changes
                  </button>
                  <button type="submit" className="save-change-button">
                    Save changes
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
