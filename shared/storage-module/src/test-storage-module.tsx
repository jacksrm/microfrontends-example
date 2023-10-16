import { cart } from './entity/cart.entity';
import { products } from './entity/product.entity';

export * from './types';
export * from './utils/event-names';
export * from './utils/dispatch-custom-event';
export { BehaviorSubject } from 'rxjs';

export enum MfNames {
  MF_PRODUCTS = 'MF_PRODUCTS',
  MF_CART = 'MF_CART',
}

export enum Events {
  ADD_PRODUCTS = 'ADD_PRODUCTS',
  LIST_PRODUCTS = 'LIST_PRODUCTS',
  REMOVE_PRODUCTS = 'REMOVE_PRODUCTS',
  LIST_CART = 'LIST_CART',
  ADD_CART = 'ADD_CART',
  REMOVE_CART = 'REMOVE_CART',
}

export function getObservable(mfName: MfNames) {
  const mfNameAction = {
    [MfNames.MF_PRODUCTS]: () => {
      return products.products$;
    },
    [MfNames.MF_CART]: () => {
      return cart.cart$;
    },
  };

  return mfNameAction[mfName]();
}

type Message = {
  topic: Events;
  id: number;
  payload: any;
};

export function send(message: Message) {
  const { topic, id } = message;

  const topicAction = {
    [Events.LIST_PRODUCTS]: () => {
      products.products$.next(products.products);
    },
    [Events.ADD_PRODUCTS]: () => {
      products.addProduct(message.payload);
    },
    [Events.REMOVE_PRODUCTS]: () => {
      products.removeProduct(message.payload);
    },
    [Events.LIST_CART]: () => {
      cart.cart$.next(cart.cart);
    },
    [Events.ADD_CART]: () => {
      cart.addToCart(message.payload);
    },
    [Events.REMOVE_CART]: () => {
      cart.removeFromCart(message.payload);
    },
  };

  topicAction[topic]();
}
