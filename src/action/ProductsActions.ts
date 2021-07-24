import { ListProductsQuery, OnCreateProductSubscription } from "../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Category } from "../models";

export interface Product {
    id: string;
    name: string;
    categoryID: string;
    price: number;
    inStock: boolean;
    category: any;
}

function mapListProductsQuery(
    listProductsQuery: GraphQLResult<ListProductsQuery>
    ): Product[] {
        return listProductsQuery.data?.listProducts?.items?.map(
            product => ({
                id: product?.id,
                name: product?.name,
                categoryID: product?.categoryID,
                price: product?.price,
                inStock: product?.inStock,
                category: product?.category
            } as Product)
        ) || []
}

function mapOnCreateProductSubscription(
    createProductSubscription: OnCreateProductSubscription): Product {
        const {
            id, 
            name, 
            categoryID, 
            price, 
            inStock,
            category } = createProductSubscription.onCreateProduct || {};

        return {
            id,
            name,
            categoryID,
            price,
            inStock,
            category
        } as Product
    }

export { mapListProductsQuery, mapOnCreateProductSubscription }