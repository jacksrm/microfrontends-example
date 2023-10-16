import { useCallback, useEffect, useMemo, useState } from 'react';
import Parcel from 'single-spa-react/parcel';
import {
  ADD_PRODUCTS,
  EventPayload,
  LIST_PRODUCTS,
  LIST_PRODUCTS_RESPONSE,
  PRODUCTS_UPDATED,
  ProductList,
  dispatchCustomEvent,
  Events,
  send,
  // @ts-ignore
} from '@test/storage-module';
import { AppProps } from 'single-spa';

const EVENT_ID = '@test/home/root';

type RootProps = {} & AppProps;

export default function Root(props: RootProps) {
  const [products, setProducts] = useState<ProductList>([]);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [id, setId] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // dispatchCustomEvent(ADD_PRODUCTS, {
    //   id: EVENT_ID,
    //   payload: { id, name, price, description },
    // });

    send({
      topic: Events.ADD_PRODUCTS,
      id: Date.now(),
      payload: { id, name, price, description },
    });
  };

  return (
    <section className="flex flex-col items-start p-3">
      <h1 className="mb-7 text-2xl">Products</h1>
      <form
        className="flex flex-col items-start rounded-lg border-2 border-black p-2"
        onSubmit={handleSubmit}
      >
        <label className="flex items-center">
          Name
          <input
            className="my-1 border-b border-b-black px-2 outline-none"
            type="text"
            placeholder="Name"
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
        </label>
        <label className="flex items-center">
          Price
          <input
            className="my-1 border-b border-b-black px-2 outline-none"
            type="text"
            placeholder="Price"
            onChange={(ev) => setPrice(Number(ev.target.value))}
            value={price}
          />
        </label>
        <label className="flex items-center">
          Description
          <input
            className="my-1 border-b border-b-black px-2 outline-none"
            type="text"
            placeholder="Description"
            onChange={(ev) => setDescription(ev.target.value)}
            value={description}
          />
        </label>
        <label className="flex items-center">
          Id
          <input
            className="my-1 border-b border-b-black px-2 outline-none"
            type="text"
            placeholder="Id"
            pattern="[0-9].*"
            onChange={(ev) => setId(Number(ev.target.value))}
            value={id}
          />
        </label>
        <button
          className={`
            transition-[brightness, scale] 
            mt-2 
            w-full 
            rounded-md 
            bg-green-400 
            px-3 
            text-xl 
            font-bold 
            duration-200 
            hover:brightness-95 
            active:scale-95
          `}
          type="submit"
        >
          Add
        </button>
      </form>
      {products && (
        <div>
          <Parcel
            wrapWith="ul"
            config={() => System.import<any>('@test/product')}
            wrapClassName="mt-3 flex flex-wrap gap-3"
          />
        </div>
      )}
      {/* {products?.map(({ description, id, name, price }) => (
          <Parcel
            wrapWith="li"
            key={id}
            config={() => System.import<any>('@test/product')}
            product={{ description, id, name, price }}
            parcelId={id}
          />
        ))} */}
    </section>
  );
}
