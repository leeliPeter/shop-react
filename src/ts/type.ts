type Product = {
    productId: number;
    name: string;
    price: number;
    size: string[];
    category: string;
    position?: string;
    image: string[];
    description: string;
    quantity: { size: string, quantity: number }[];
    descriptionImg:string[];
    publishTime:string;
};
type Item = {
    product: Product;
    quantity: number;
    size: string;
};
type Cart = Item[];
type Order = {
    orderId : string;
    cart: Cart;
    userId:string;
}
type OrderHistory = Order[];

type UserInfo = {
    userId:string;
    name: string;
    email: string;
    password: string;
    cart: Cart;
    orderHistory:OrderHistory
};
let products: Product[] = [
    {
        productId: 1,
        name: "MYD backpack1",
        price: 100,
        size: ["M", "L", "XL"],
        category: "mens",
        position: "top",
        image: ["/images/IMG_6404.JPG","/images/IMG_6406.JPG","/images/IMG_6408.JPG","/images/IMG_6409.JPG"],
        description: "This is a backpack I really love it, because it looks well, and have a good quality",
        quantity: [{ size: "M", quantity: 1 },{size:"L",quantity:2},{size:"XL",quantity:3}],
        descriptionImg:["/images/descriptionImg.JPG","/images/descriptionImg2.JPG","/images/descriptionImg3.JPG","/images/descriptionImg4.JPG" ],
        publishTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    },
    {
        productId:  2,
        name: "MYD backpack2",
        price: 100,
        size: ["S","L"],
        category: "mens",
        position: "top",
        image: ["/images/IMG_6406.JPG"],
        description: "This is a backpack",
        quantity: [{ size: "S", quantity: 100 },{size:"L",quantity:10},{size:"XL",quantity:3}],
        descriptionImg:["/images/descriptionImg.JPG","/images/descriptionImg2.JPG","/images/descriptionImg3.JPG","/images/descriptionImg4.JPG" ],
        publishTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    },
    {
        productId:  3,
        name: "MYD backpack3",
        price: 100,
        size: ["M", "L", "XL"],
        category: "mens",
        position: "top",
        image: ["/images/IMG_6408.JPG"],
        description: "This is a backpack",
        quantity: [{ size: "M", quantity: 1 },{size:"L",quantity:2},{size:"XL",quantity:3}],
        descriptionImg:["/images/descriptionImg.JPG","/images/descriptionImg2.JPG","/images/descriptionImg3.JPG","/images/descriptionImg4.JPG" ],
        publishTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    },
    {
        productId:  4,
        name: "MYD backpack4",
        price: 100,
        size: ["M", "L", "XL"],
        category: "mens",
        position: "shoes",
        image: ["/images/IMG_6409.JPG"],
        description: "This is a backpack",
        quantity: [{ size: "M", quantity: 1 },{size:"L",quantity:2},{size:"XL",quantity:3}],
        descriptionImg:["/images/descriptionImg.JPG","/images/descriptionImg2.JPG","/images/descriptionImg3.JPG","/images/descriptionImg4.JPG" ],
        publishTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    },
    {
        productId:  5,
        name: "MYD backpack5",
        price: 100,
        size: ["M", "L", "XL"],
        category: "mens",
        position: "bottom",
        image: ["/images/IMG_6410.JPG"],
        description: "This is a backpack",
        quantity: [{ size: "M", quantity: 1 },{size:"L",quantity:2},{size:"XL",quantity:3}],
        descriptionImg:["/images/descriptionImg.JPG","/images/descriptionImg2.JPG","/images/descriptionImg3.JPG","/images/descriptionImg4.JPG" ],
        publishTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    },
    {
        productId:  6,
        name: "MYD backpack6",
        price: 100,
        size: ["M", "L", "XL"],
        category: "womens",
        position: "top",
        image: ["/images/IMG_6410.JPG"],
        description: "This is a backpack",
        quantity: [{ size: "M", quantity: 1 },{size:"L",quantity:2},{size:"XL",quantity:3}],
        descriptionImg:["/images/descriptionImg.JPG","/images/descriptionImg2.JPG","/images/descriptionImg3.JPG","/images/descriptionImg4.JPG" ],
        publishTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    },
    {
        productId: 7,
        name: "MYD backpack7",
        price: 100,
        size: ["M", "L", "XL"],
        category: "fnb",
        image: ["/images/IMG_6410.JPG"],
        description: "This is a backpack",
        quantity: [{ size: "M", quantity: 1 },{size:"L",quantity:2},{size:"XL",quantity:3}],
        descriptionImg:["/images/descriptionImg.JPG","/images/descriptionImg2.JPG","/images/descriptionImg3.JPG","/images/descriptionImg4.JPG" ],
        publishTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    },
    {
        productId: 8,
        name: "MYD backpack8",
        price: 100,
        size: ["M", "L", "XL"],
        category: "others",
        image: ["/images/IMG_6410.JPG"],
        description: "This is a backpack",
        quantity: [{ size: "M", quantity: 1 },{size:"L",quantity:2},{size:"XL",quantity:3}],
        descriptionImg:["/images/descriptionImg.JPG","/images/descriptionImg2.JPG","/images/descriptionImg3.JPG","/images/descriptionImg4.JPG" ],
        publishTime: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    }
];

let peter: UserInfo = {
    userId: "1",
    name: "Peter",
    email: "lei23lei91@gmail.com",
    password: "123456",
    cart: [{product:products[0],quantity:1,size:"M"},{product:products[1],quantity:2,size:"L"}],
    orderHistory: []
};

export { products,peter };
export type { Product,UserInfo };


type HomeImages = {image:string,url:string}[];
let homeImages: HomeImages = [{image:"/images/home.JPG",url:"/detail/1"},{image:"/images/home2.JPG",url:"/detail/2"},{image:"/images/home3.jpg",url:"/detail/3"}];
export { homeImages };