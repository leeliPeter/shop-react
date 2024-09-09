import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-logo">
          <img src="/images/146855.png" alt="" />
        </div>
        <div className="footer-text">
          <p className="shop-name">Peter's Shop</p>
          <p>Address: 203 Humber College Blvd, Etobicoke</p>
          <p>Phone: 123-456-7890</p>
          <p>Email : lei23lei91@gmail.com</p>
          <p>
            <a href="https://www.instagram.com/leelitam/">
              <img src="/images/Instagram_icon.png.webp" alt="" />
              <span>LeeliTam</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
