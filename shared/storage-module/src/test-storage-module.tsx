import { createGalactic } from 'galactic-state';
import { Cart, EventPayload, Product, ProductList } from './types';
import { dispatchCustomEvent } from './utils/dispatch-custom-event';
import {
  ADD_CART,
  ADD_PRODUCTS,
  LIST_CART,
  LIST_CART_RESPONSE,
  LIST_PRODUCTS,
  LIST_PRODUCTS_RESPONSE,
  REMOVE_CART,
  REMOVE_PRODUCTS,
} from './utils/event-names';
import { cart } from './entity/cart.entity';
import { products } from './entity/product.entity';

export * from './types';
export * from './utils/event-names';
export * from './utils/dispatch-custom-event';

// const [useCart] = createGalactic<Cart>(null);
// const [useProducts] = createGalactic<ProductList>(null);

function listProducts({ detail: { id } }: CustomEvent<EventPayload>) {
  dispatchCustomEvent(LIST_PRODUCTS_RESPONSE, {
    id,
    payload: products.products,
  });
}

function addProduct({
  detail: { payload: product },
}: CustomEvent<EventPayload<Product>>) {
  products.addProduct(product);
}

function removeProduct({
  detail: { payload: product },
}: CustomEvent<EventPayload<Product>>) {
  products.removeProduct(product);
}

function addToCart({
  detail: { payload: product },
}: CustomEvent<EventPayload<Product>>) {
  cart.addToCart(product);
}

function listCart({ detail: { id } }: CustomEvent<EventPayload>) {
  dispatchCustomEvent(LIST_CART_RESPONSE, {
    payload: cart.cart,
    id,
  });
}

function removeProductFromCart({
  detail: { payload: product },
}: CustomEvent<EventPayload<Product>>) {
  cart.removeFromCart(product);
}

addEventListener(ADD_PRODUCTS, addProduct);
addEventListener(LIST_PRODUCTS, listProducts);
addEventListener(REMOVE_PRODUCTS, removeProduct);
addEventListener(ADD_CART, addToCart);
addEventListener(LIST_CART, listCart);
addEventListener(REMOVE_CART, removeProductFromCart);
