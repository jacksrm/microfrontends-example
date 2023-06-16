import { useState, useEffect } from 'react';
import {
  dispatchCustomEvent,
  ProductList,
  EventPayload,
  LIST_PRODUCTS_RESPONSE,
  PRODUCTS_UPDATED,
  LIST_PRODUCTS,
  // @ts-ignore
} from '@test/storage-module';
import { AppProps } from 'single-spa';
import ListItem from './components/list-item.component';

type RootProps = {} & AppProps;

const EVENT_ID = '@test/product/root';

export default function Root(props: RootProps) {
  const [products, setProducts] = useState<ProductList>(null);

  useEffect(() => {
    const listProductsResponseEventListener = (
      event: CustomEvent<EventPayload<ProductList>>
    ) => {
      const { id, payload } = event.detail;

      if (id !== EVENT_ID) return;

      setProducts(payload);
    };

    const productsUpdatedResponseEventListener = (
      event: CustomEvent<ProductList>
    ) => {
      const { detail: payload } = event;

      setProducts(payload);
    };

    addEventListener(LIST_PRODUCTS_RESPONSE, listProductsResponseEventListener);
    addEventListener(PRODUCTS_UPDATED, productsUpdatedResponseEventListener);

    dispatchCustomEvent(LIST_PRODUCTS, { id: EVENT_ID, payload: null });

    return () => {
      removeEventListener(
        LIST_PRODUCTS_RESPONSE,
        listProductsResponseEventListener
      );

      removeEventListener(
        PRODUCTS_UPDATED,
        productsUpdatedResponseEventListener
      );
    };
  }, []);

  return (
    <>
      {products?.map((product) => (
        <ListItem key={product.id} product={product} />
      ))}
    </>
  );
}
