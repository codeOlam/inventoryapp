import React, {useState, useEffect} from "react";
import { Table } from "antd";
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

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Price', dataIndex: 'price', key: 'price'},
        {title: 'is Available?', dataIndex: 'inStock', key: 'inStock'},
        {title: 'CatID', dataIndex: 'catID', key: 'catID'},
        {title: 'Actions', dataIndex: '', key: 'x', render: () =><a>Delete</a>},
    ];

    const data = products?.map(row => ({
        name: row.name,
        price: row.price,
        inStock: row.inStock,
        catId: row.categoryID
    }))

    return(
        <div>
            <h1>All Products</h1>
            {loading && <h2>Loading...</h2>}
            {
                 products?.map(product => ( 
                    console.log("product: ", product),
                    <div key={product.id}>
                        <h2>Name: {product.name}</h2>
                        <h3>Price: {product.price} ||
                            Available: {product.inStock} ||
                            catID: {product.categoryID}
                        </h3>
                    </div>
                ))
            }
            <h3>Product Table</h3>
            <Table 
                columns={columns}
                dataSource={data}
            />
            <CreateProduct />
        </div>

    )
}

export default Products