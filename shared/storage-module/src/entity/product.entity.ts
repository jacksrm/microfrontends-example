import { PRODUCTS_UPDATED } from '../test-storage-module';
import { Product } from '../types';

class ProductList {
  private _products: Product[] | null = null;

  constructor() {
    this._products = JSON.parse(localStorage.getItem('products') ?? null);
  }

  get products(): Product[] | null {
    return this._products;
  }

  private set products(products: Product[] | null) {
    this._products = products;
    this.productsUpdated();
  }

  addProduct(product: Product) {
    const productExists = this._products?.find(
      (item) => item.id === product.id,
    );

    if (productExists) return;

    this.products = [...(this._products ?? []), product];

    localStorage.setItem('products', JSON.stringify(this._products));
  }

  removeProduct(product: Product) {
    if (!this._products) return;

    this.products = this._products.filter((item) => item.id !== product.id);
    localStorage.setItem('products', JSON.stringify(this._products));
  }

  private productsUpdated() {
    const event = new CustomEvent(PRODUCTS_UPDATED, {
      detail: this._products,
    });

    dispatchEvent(event);
  }
}

export const products = new ProductList();
