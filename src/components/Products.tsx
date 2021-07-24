import React, {useState, useEffect} from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { listProducts } from "../graphql/queries";
import { ListProductsQuery} from "../API";
import actionGraphQL from "../action/GraphQlWrapper";
import  {mapListProductsQuery, Product} from "../action/ProductsActions";
import CreateProduct from "../forms/CreateProduct";
import { Layout, Breadcrumb } from 'antd';


const { Content } = Layout;

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
        <> 
          <Breadcrumb style={{ margin: '20px 16px' }}>
            <Breadcrumb.Item>
                <Link to={`/`}>DashBoard </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>All Products</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
            }}
          >
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
            </Content>
        </>

    )
}

export default Products