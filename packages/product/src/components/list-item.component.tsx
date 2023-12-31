import {
  Events,
  Product,
  send,
  // @ts-ignore
} from '@test/storage-module';
import { FiX } from 'react-icons/fi';

type ListItemProps = {
  product: Product;
};

export default function ListItem(props: ListItemProps) {
  const handleDeleteProduct = () => {
    const response = confirm('Remove this product from list?');

    if (!response) return;

    send({
      topic: Events.REMOVE_PRODUCTS,
      id: Date.now(),
      payload: props.product,
    });
  };

  const handleAddToCart = () => {
    send({
      topic: Events.ADD_CART,
      id: Date.now(),
      payload: props.product,
    });
  };

  return (
    <li className="relative flex flex-col rounded-md border-2 border-black p-2">
      <button
        onClick={handleDeleteProduct}
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
      <h2 className="text-xl">Product: {props.product.name}</h2>
      <h3>Price: R$ {props.product.price}</h3>
      <p>Description: {props.product.description}</p>
      <button
        onClick={handleAddToCart}
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
      >
        Add to Cart
      </button>
    </li>
  );
}
