import React, {useState, useEffect} from "react";
import { listProducts } from "../graphql/queries";
import { ListProductsQuery} from "../API";
import actionGraphQL from "../action/GraphQlWrapper";
import  {mapListProductsQuery, Product} from "../action/ProductsActions";
import CreateProduct from "./CreateProduct";

function Products(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)

    async function getProducts() {
        try{
            const prodData = await actionGraphQL<ListProductsQuery>(listProducts);
            const products = mapListProductsQuery(prodData);
            setLoading(false);
            setProducts(products);
        }catch(error){
            console.log("Error Querying Products: ", error);
        }
    }

    useEffect(()=>{
        getProducts()
    }, [])

    return(
        <div>
            <h1>All Products</h1>
            {loading && <h2>Loading...</h2>}
            {
                products?.map(product => (
                    <div key={product.id}>
                        <h2>Name: {product.name}</h2>
                        <h3>Price: {product.price} ||
                            Available: {product.inStock.valueOf} ||
                            catID: {product.categoryID}
                        </h3>
                    </div>
                ))
            }
            <h3>Add New Product</h3>
            <CreateProduct />
        </div>

    )
}

export default Products