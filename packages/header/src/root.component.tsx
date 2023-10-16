import { useContext, useEffect, useState } from 'react';
import { SingleSpaContext } from 'single-spa-react';
import { NavItem } from './components/nav-item.component';
import {
  BehaviorSubject,
  Cart,
  MfNames,
  getObservable,
  // @ts-ignore
} from '@test/storage-module';

export default function Root() {
  const {
    singleSpa: { navigateToUrl },
  } = useContext(SingleSpaContext);

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
    const cart$ = getObservable(MfNames.MF_CART) as BehaviorSubject<Cart>;
    const subscription = cart$.subscribe({
      next(cart: Cart) {
        setCartTotal(() => handleSetCartTotal(cart));
        setCartQuantity(() => handleSetCartQuantity(cart));
      },
    });

    return () => {
      subscription.unsubscribe();
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
