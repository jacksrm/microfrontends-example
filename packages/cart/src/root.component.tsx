import {
  Cart,
  CartItem,
  Events,
  MfNames,
  Product,
  getObservable,
  send,
  BehaviorSubject,
  // @ts-ignore
} from '@test/storage-module';
import { useEffect, useState } from 'react';
import { AppProps } from 'single-spa';
import { FiX } from 'react-icons/fi';

const EVENT_ID = '@test/cart/root';

type RootProps = {} & AppProps;

export default function Root(props: RootProps) {
  const [cart, setCart] = useState<Cart>(null);

  const handleDeleteButtonClick = (product: Product) => {
    send({
      topic: Events.REMOVE_CART,
      id: Date.now(),
      payload: product,
    });
  };

  useEffect(() => {
    const cart$ = getObservable(MfNames.MF_CART) as BehaviorSubject<CartItem[]>;
    const sub = cart$.subscribe({
      next(cart: CartItem[]) {
        setCart(cart);
      },
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);
  return (
    <section>
      <h1 className="m-3 mb-7 text-2xl">Cart</h1>
      <ul
        className={`
        m-3
        flex
        flex-col
        gap-3
        p-3
      `}
      >
        {cart?.map((item) => (
          <li
            className={` 
              relative
              flex
              justify-between
              gap-1 
              rounded-md  
              p-3
              shadow-custom
            `}
            key={item.product.id}
          >
            <button
              onClick={() => handleDeleteButtonClick(item.product)}
              className={`
              absolute 
              right-[-.5rem] 
              top-[-.5rem]
              rounded-full 
              bg-red-400
              p-[.125rem]
              transition-[transform]
              duration-200
              hover:scale-125
              active:scale-110 
            `}
            >
              <FiX
                className={`
                stroke-black
                text-xl
              `}
              />
            </button>
            <div className="flex flex-col">
              <h2 className="text-xl ">{item.product.name}</h2>
              <p>{item.product.description}</p>
              <p>R$ {item.product.price}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-2xl">
                Total: R${' '}
                {(item.quantity * item.product.price)
                  .toFixed(2)
                  .replace('.', ',')}
              </span>
              <span>Quantity: {item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
