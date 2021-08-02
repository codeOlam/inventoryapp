import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { listProducts } from "../graphql/queries";
import { deleteProduct } from "../graphql/mutations";
import { 
    ListProductsQuery, 
    DeleteProductMutation, 
    DeleteProductMutationVariables} from "../API";
import actionGraphQL from "../action/GraphQlWrapper";
import  {mapListProductsQuery, Product} from "../action/ProductsActions";
import CreateProduct from "../forms/CreateProduct";
import { Layout, Breadcrumb, Table, Tag, Spin, Popconfirm, Popover } from 'antd';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { DeleteTwoTone } from "@ant-design/icons";
import UpdateProduct from "../forms/UpdateProduct";


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
            console.log('products: ', products)
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
        {
            title: 'is Available?', 
            dataIndex: 'inStock', 
            key: 'inStock',
            render: (inStock: boolean) =>(
                <>
                    {
                        inStock ? 
                            <Tag color="green" > In Stock </Tag> : 
                            <Tag color="volcano">Out of Stock</Tag> 
                    }
                </>
            )
        },
        {title: 'Category', dataIndex: 'category', key: 'category'},
        {
            title: 'Actions', 
            dataIndex: '', 
            key: 'x', 
            render: () =><>
            <Popconfirm title="Confirm item removal?" ><a onClick={() =>products.filter(product => product.id !== product.id)}><DeleteTwoTone /></a></Popconfirm>
            <Popover content="Update item status"> <UpdateProduct/></Popover>
            {/* <Popover content="Update item status"><a> <EditableTable /></a></Popover> */}
            {/* <EditableTable /> */}
            </>
        },
    ];



    const data = products?.map(row => ({
        name: row.name,
        price: row.price,
        inStock: row.inStock,
        category: row.category.name
    }))

    async function deleteProduct(id: string){
        const productsList = products.filter(product => product.id !== id)
        setProducts(productsList);
        try{
           const response = await actionGraphQL<DeleteProductMutation>(
               deleteProduct, {input: {id}} as DeleteProductMutationVariables ) 
               console.log('Product successfully deleted: ', response)
        } catch(error){
            console.log('Error Deleting Product record: ', error);
        }
        
    }

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
            <CreateProduct /><br/>
            {loading && <Spin tip='loading...' size='large'/>}    
            <Table
                columns={columns}
                dataSource={data}
            />
            </Content>
        </>

    )
}

export default withAuthenticator(Products)
