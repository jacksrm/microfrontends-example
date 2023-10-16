import { useState, useEffect } from 'react';
import {
  ProductList,
  MfNames,
  getObservable,
  Product,
  BehaviorSubject,
  // @ts-ignore
} from '@test/storage-module';
import ListItem from './components/list-item.component';

export default function Root() {
  const [products, setProducts] = useState<ProductList>(null);

  useEffect(() => {
    const products$ = getObservable(
      MfNames.MF_PRODUCTS
    ) as BehaviorSubject<ProductList>;
    const sub = products$.subscribe({
      next(products: Product[]) {
        setProducts(products);
      },
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  if (!products || !products.length) return <p>No Products yet.</p>;

  return (
    <>
      {products?.map((product) => (
        <ListItem key={product.id} product={product} />
      ))}
    </>
  );
}
