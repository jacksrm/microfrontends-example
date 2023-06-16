import { useContext, useEffect, useState } from 'react';
import { SingleSpaContext } from 'single-spa-react';
import { NavItem } from './components/nav-item.component';
import {
  CART_UPDATED,
  Cart,
  EventPayload,
  LIST_CART,
  LIST_CART_RESPONSE,
  dispatchCustomEvent,
  // @ts-ignore
} from '@test/storage-module';
import { AppProps } from 'single-spa';

const EVENT_ID = '@test/header/root';

type RootProps = {} & AppProps;

export default function Root({ singleSpa }: RootProps) {
  const { navigateToUrl } = singleSpa;

  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<string>('0');

  const navigateToCart = () => {
    navigateToUrl('/cart');
  };

  const navigateToHome = () => {
    navigateToUrl('/home');
  };

  const handleSetCartTotal = (cart: Cart | null) => {
    if (!cart) return (0).toFixed(2).replace('.', ',');

    const value = cart.reduce((acc, item) => {
      const total = item.product.price * item.quantity;
      return acc + total;
    }, 0);
    return value.toFixed(2).replace('.', ',');
  };

  const handleSetCartQuantity = (cart: Cart | null) => {
    if (!cart) return 0;

    return cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  useEffect(() => {
    addEventListener(
      LIST_CART_RESPONSE,
      (event: CustomEvent<EventPayload<Cart>>) => {
        const { id, payload } = event.detail;

        if (id !== EVENT_ID) return;

        setCartTotal(() => handleSetCartTotal(payload));
        setCartQuantity(() => handleSetCartQuantity(payload));
      }
    );

    addEventListener(CART_UPDATED, (event: CustomEvent<Cart>) => {
      const { detail: payload } = event;

      setCartTotal(() => handleSetCartTotal(payload));
      setCartQuantity(() => handleSetCartQuantity(payload));
    });

    dispatchCustomEvent(LIST_CART, { id: EVENT_ID, payload: null });

    return () => {
      removeEventListener(LIST_CART_RESPONSE, () => {});
      removeEventListener(CART_UPDATED, () => {});
    };
  }, []);

  return (
    <header className="flex justify-around bg-red-500 p-1">
      <NavItem handleClick={navigateToCart} href="/cart">
        Cart
      </NavItem>
      <h1 className="p-4 text-2xl font-bold text-white">
        Cart: {cartQuantity} | Total: R$ {cartTotal}
      </h1>
      <NavItem handleClick={navigateToHome} href="/">
        Home
      </NavItem>
    </header>
  );
}
