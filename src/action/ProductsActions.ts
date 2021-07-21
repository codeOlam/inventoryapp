import { ListProductsQuery } from "../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";

export interface Product {
    id: string;
    name: string;
    categoryID: string;
    price: number;
    inStock: boolean;
    category?: string;
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

export default mapListProductsQuery