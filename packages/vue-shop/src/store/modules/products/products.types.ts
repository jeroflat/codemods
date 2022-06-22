export interface IProduct {
  id: string,
  name: string,
  img: string,
  [key: string]: string,
}

export interface IProductsState {
  product: IProduct,
  products: Array<IProduct>,
}