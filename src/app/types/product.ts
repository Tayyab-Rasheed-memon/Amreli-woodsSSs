export type Specification = { 
  name: string; 
  value: string; 
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: {
    asset: {
      url: string;
      small?: string;
      medium?: string;
    };
  };
  category: "Electronics" | "Clothing" | "Books" | "Furniture"; // Example
  slug: {
    current: string;
  };
  specifications: boolean | Specification[];
  stock?: number;
  rating?: number;
  reviewsCount?: number;
  featured?: boolean;
};









// types.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  // Add other necessary properties
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}




// app/types.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  sku?: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}






// export type Product = {
//   specifications: boolean | { name: string; value: string }[]; // Can be boolean or an array of objects
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   originalPrice?: number; // Add this field
//   image: {
//     asset: {
//       url: string;
//     };
//   };
//   category: string; // Adjust if needed
//   slug: {
//     current: string; // Slug should be a string
//   };
// };


// export type Product = {
//   specifications: boolean | { name: string; value: string }[]; // Can be boolean or an array of objects
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: {
//     asset: {
//       url: string;
//     };
//   };
//   category: string; // Adjust if needed
//   slug: {
//     current: string; // Slug should be a string
//   };
// };

// export interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   image?: {
//     asset: {
//       _ref: string;
//     };
//   };
//   slug: {
//     current: string;

//   };
// }

// export type Product = {
//   specifications: boolean;
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: {
//     asset: {
//       url: string;
//     };
//   };
//   category: string; // Adjust if needed
//   slug: {
//     current: string; // Slug should be a string
//   };
// };

// export interface Product {
//   _id: string; // Unique identifier for each product
//   title: string; // Product title
//   description?: string; // Optional field for product description
//   price: number; // Product price
//   image?: {
//     asset: {
//       _ref: string; // Reference to the image asset in Sanity
//       _type : "iamage";
//     }
//   }; // Optional to handle missing images
//   slug:{
//     _type : "slug"
//     current : string
//   }

// }

// export interface Product {
//   _id: string; // Unique identifier for each product
//   title: string; // Product title
//   description?: string; // Optional field for product description
//   price: number; // Product price
//   image: {
//     asset: {
//       _ref: string; // Reference to the image asset in Sanity
//     };
//   };
//   slug: {
//     current: string; // The current slug for dynamic routing
//   };
// }



// export interface Product {
//   _id:string;
//   title:string;
//   tyoe:"products";
//   image? :{
//     asset : {
//       _ref :string
//       _type : "image"
//     } 
//   };
//   price :number
//   description?: string

// } 