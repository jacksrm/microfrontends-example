import {
  CART_UPDATED,
  Cart,
  EventPayload,
  LIST_CART,
  LIST_CART_RESPONSE,
  Product,
  REMOVE_CART,
  dispatchCustomEvent,
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
    dispatchCustomEvent(REMOVE_CART, { id: EVENT_ID, payload: product });
  };

  useEffect(() => {
    const listCartResponseEventListener = (
      event: CustomEvent<EventPayload<Cart>>
    ) => {
      const { id, payload } = event.detail;

      if (id !== EVENT_ID) return;

      setCart(payload);
    };

    const cartUpdatedResponseEventListener = (event: CustomEvent<Cart>) => {
      const { detail: payload } = event;

      setCart(payload);
    };

    addEventListener(LIST_CART_RESPONSE, listCartResponseEventListener);
    addEventListener(CART_UPDATED, cartUpdatedResponseEventListener);

    dispatchCustomEvent(LIST_CART, { id: EVENT_ID, payload: null });

    return () => {
      removeEventListener(LIST_CART_RESPONSE, listCartResponseEventListener);

      removeEventListener(CART_UPDATED, cartUpdatedResponseEventListener);
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
