import { products, Product } from "../../ts/type";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { updateCart } from "../../Redux/userInfoSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./detail.css";
import Carousel from "./carousel/Carousel";

interface Params {
  [key: string]: string | undefined;
  id?: string;
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export default function Detail() {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userCart = useAppSelector((state) => state.userInfo.cart);

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showReminder, setShowReminder] = useState<boolean>(false);
  const [showSizeReminder, setShowSizeReminder] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10);
      const foundProduct = products.find(
        (item) => item.productId === numericId
      );
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(null);
        setQuantity(1);
        setShowReminder(false);
        setShowSizeReminder(false);
      }
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="detailNotFound">Product not found</div>;
  }

  const sizeQuantities = new Map<string, number>(
    product.quantity.map(({ size, quantity }) => [size, quantity])
  );

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
    setShowReminder(false);
    setShowSizeReminder(false);
  };

  const incrementQuantity = () => {
    if (selectedSize) {
      const maxQuantity = sizeQuantities.get(selectedSize) || 0;
      setQuantity((prevQuantity) => {
        if (prevQuantity < maxQuantity) {
          setShowReminder(false);
          return prevQuantity + 1;
        } else {
          setShowReminder(true);
          return prevQuantity;
        }
      });
    }
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      setShowReminder(false);
      return newQuantity;
    });
  };

  const addToCart = () => {
    if (selectedSize) {
      const newItem: CartItem = {
        product: product,
        size: selectedSize,
        quantity,
      };

      const existingItemIndex = userCart.findIndex(
        (item) =>
          item.product.productId === product.productId &&
          item.size === selectedSize
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...userCart];
        updatedCart[existingItemIndex] = newItem;
      } else {
        updatedCart = [...userCart, newItem];
      }

      dispatch(updateCart(updatedCart));
      setShowSizeReminder(false);
    } else {
      setShowSizeReminder(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-image">
          <Carousel product={product} />
        </div>
        <div className="product-description">
          <div className="product-name">{product.name}</div>
          <div className="price">${product.price}</div>

          <div className="product-info">
            <p>{product.description}</p>
          </div>
          <div className="size">
            <div>Choose size</div>
            <ul>
              {product.size.map((size) => (
                <li
                  key={size}
                  className={selectedSize === size ? "sizeSelected" : ""}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </li>
              ))}
              {showSizeReminder && (
                <span className="sizeReminder">*Please choose a size</span>
              )}
            </ul>
          </div>
          <div className="product-quantity">
            <div className="quantity">Quantity</div>
            <div className="quantity-button">
              <span
                className="iconfont icon-minus"
                onClick={decrementQuantity}
              ></span>
              <span className="quantity-number">{quantity}</span>
              <span
                className="iconfont icon-add"
                onClick={incrementQuantity}
              ></span>
              {showReminder && (
                <span className="quantityReminder">
                  Maximum available quantity reached
                </span>
              )}
            </div>
          </div>
          <div className="detail-btns">
            <div className="add-to-cart-button detail-btn" onClick={addToCart}>
              <div>Add to cart</div>
            </div>
            <div className="go-back-btn detail-btn" onClick={goBack}>
              <div>Go back</div>
            </div>
          </div>
        </div>
      </div>
      <div className="descriptionImg">
        <div className="container">
          {product.descriptionImg.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Description ${index + 1}`}
              className="description-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
