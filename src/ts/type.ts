
type Product = {
    productId: number;
    brand?: string;
    name: string;
    price: number;
    discount: number;
    size: string[];
    category: string;
    position?: string;
    image: string[];
    description: string;
    quantity: { size: string, quantity: number }[];
    descriptionImg: string[];
    publishTime: string;
    sale: { date: string, number: number }[];
};
type Item = {
    product: Product;
    quantity: number;
    size: string;
};
type Cart = Item[];
type BuyerInfo = {

    email:string;
    firstName:string;
    lastName:string;
    address:string;
    city:string;
    state:string;
    country:string;
    zip:string;
    phone:string
};
type OrderStatus = "upaid" | "processing" | "shipped" | "finished";
export type Order = {
    orderId : string;
    cart: Cart;
    userId?:string;
    status: OrderStatus
    date: string;
    totalPrice: number;
    buyerInfo:BuyerInfo;
}
type OrderHistory = Order[];

type UserInfo = {
    userId:string;
    name: string;
    email: string;
    password: string;
    subscribe?: boolean;
    cart: Cart;
    orderHistory:OrderHistory;
    registerDate:string;
    profile:{email:string,firstName:string,lastName:string,birthday:string,gender:string,phone:string,country:string,state:string,city:string,zip:string,address:string,};
};


export type { Product, Item, Cart, OrderHistory, UserInfo,OrderStatus };


export type HomeImages = {image:string,url:string}[];
// image in public
let homeImages:HomeImages = [
    {image:"/images/home.JPG",url:"/product/1"},
    {image:"/images/home2.JPG",url:"/product/2"},
    {image:"/images/home3.jpg",url:"/product/3"},

];
export {homeImages};