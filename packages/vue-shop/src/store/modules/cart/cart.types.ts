import { IProduct } from '../products/products.types';

export interface ICartState {
  count: number,
  products: Array<IProduct>,
}