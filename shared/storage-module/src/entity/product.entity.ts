import { Product } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';

class ProductList {
  private _products: Product[] | null = null;
  readonly products$: BehaviorSubject<Product[] | null>;

  constructor() {
    this._products = JSON.parse(localStorage.getItem('products') ?? null);
    this.products$ = new BehaviorSubject<Product[] | null>(this._products);
  }

  get products(): Product[] | null {
    return this._products;
  }

  private set products(products: Product[] | null) {
    this._products = products;
    this.saveToLocalStorage();
    this.products$.next(this._products);
  }

  addProduct(product: Product) {
    const productExists = this._products?.find(
      (item) => item.id === product.id
    );

    if (productExists) return;

    this.products = [...(this._products ?? []), product];
  }

  removeProduct(product: Product) {
    if (!this._products) return;

    this.products = this._products.filter((item) => item.id !== product.id);
  }

  private saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this._products));
  }
}

export const products = new ProductList();
