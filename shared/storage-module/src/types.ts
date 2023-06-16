export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = CartItem[] | null;

export type ProductList = Product[] | null;

export type EventPayload<T = null> = {
  id: string;
  payload: T;
};
