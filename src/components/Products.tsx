import React, {useState, useEffect} from "react";
import { Table } from "antd";
import { listProducts } from "../graphql/queries";
import { ListProductsQuery} from "../API";
import actionGraphQL from "../action/GraphQlWrapper";
import  {mapListProductsQuery, Product} from "../action/ProductsActions";
import CreateProduct from "./CreateProduct";
import { Category } from "../models";

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

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Price($)', dataIndex: 'price', key: 'price'},
        {title: 'is Available?', dataIndex: 'inStock', key: 'inStock'},
        {title: 'Category', dataIndex: 'category', key: 'category'},
        {
            title: 'Actions', 
            dataIndex: '', 
            key: 'x', 
            render: () =><><a>Delete</a> <a>Update</a></>
        },
    ];

    const data = products?.map(row => ({
        name: row.name,
        price: row.price,
        inStock: row.inStock,
        category: row.category.name
    }))

    return(
        <div> 
            <h1>All Products</h1>
            <CreateProduct />
            {loading && <h2>Loading...</h2>}
            {
                 products?.map(product => ( 
                    console.log("product: ", product),
                    console.log('category object: ', product.category.name)
                ))
            }
            <Table 
                columns={columns}
                dataSource={data}
            />
        </div>

    )
}

export default Products