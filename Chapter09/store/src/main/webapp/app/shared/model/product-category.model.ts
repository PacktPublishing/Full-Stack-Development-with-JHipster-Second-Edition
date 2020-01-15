import { IProduct } from 'app/shared/model/product.model';

export interface IProductCategory {
  id?: number;
  name?: string;
  description?: string;
  products?: IProduct[];
}

export class ProductCategory implements IProductCategory {
  constructor(public id?: number, public name?: string, public description?: string, public products?: IProduct[]) {}
}
