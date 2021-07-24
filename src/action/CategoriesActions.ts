import { ListCategoriesQuery, OnCreateCategorySubscription } from "../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";

export interface Category {
    id: string;
    name: string;
}

function mapListCategoriesQuery(
    listCategoriesQuery: GraphQLResult<ListCategoriesQuery>
    ): Category[] {
        return listCategoriesQuery.data?.listCategories?.items?.map(
            product => ({
                id: product?.id,
                name: product?.name,
            } as Category)
        ) || []
}

function mapOnCreateCategorySubscription(
    createCategorySubscription: OnCreateCategorySubscription): Category {
        const {
            id, 
            name, } = createCategorySubscription.onCreateCategory || {};

        return {
            id,
            name
        } as Category
    }

export { mapListCategoriesQuery, mapOnCreateCategorySubscription }