import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CategoryMetaData = {
  readOnlyFields;
}

type ProductMetaData = {
  readOnlyFields;
}

export declare class Category {
  readonly id: string;
  readonly name: string;
  readonly products?: (Product | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Category>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

export declare class Product {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly inStock?: boolean;
  readonly category?: Category;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}