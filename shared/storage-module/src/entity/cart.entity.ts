import { CART_UPDATED } from '../test-storage-module';
import { CartItem, Product } from '../types';

class Cart {
  private _cart: CartItem[] | null = null;

  constructor() {
    this._cart = JSON.parse(localStorage.getItem('cart') ?? null);
  }

  get cart(): CartItem[] | null {
    return this._cart;
  }

  private set cart(cart: CartItem[] | null) {
    this._cart = cart;
    this.saveToLocalStorage();
    this.dispatchCartUpdated();
  }

  addToCart(product: Product) {
    if (!this._cart) {
      this.cart = [{ product, quantity: 1 }];
      return;
    }

    const item = this._cart.find((item) => item.product.id === product.id);

    if (!item) {
      this.cart = [...this._cart, { product, quantity: 1 }];
      return;
    }

    const updatedItem: CartItem = {
      ...item,
      quantity: item.quantity + 1,
    };
    this.cart = this._cart.map((itemCart) =>
      itemCart.product.id === product.id ? updatedItem : itemCart,
    );
  }

  removeFromCart(product: Product) {
    if (!this._cart) return;

    const item = this._cart.find((item) => item.product.id === product.id);

    if (!item) return;

    if (item.quantity === 1 && this._cart.length === 1) {
      this.cart = null;
      return;
    }

    if (item.quantity === 1) {
      this.cart = this._cart.filter((item) => item.product.id !== product.id);
      return;
    }

    const updatedItem: CartItem = {
      ...item,
      quantity: item.quantity - 1,
    };

    this.cart = this._cart.map((itemCart) =>
      itemCart.product.id === product.id ? updatedItem : itemCart,
    );
  }

  private dispatchCartUpdated() {
    const event = new CustomEvent(CART_UPDATED, {
      detail: this._cart,
    });

    dispatchEvent(event);
  }

  private saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this._cart));
  }
}

export const cart = new Cart();
