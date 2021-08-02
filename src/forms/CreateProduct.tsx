import React, { useState, useEffect } from "react";
import actionGraphQL, { subGraphQL } from "../action/GraphQlWrapper";
import { createProduct } from "../graphql/mutations";
import { ListCategoriesQuery } from "../API";
import { CreateProductMutation, CreateProductMutationVariables, OnCreateProductSubscription } from "../API";
import { mapOnCreateProductSubscription, Product } from "../action/ProductsActions";
import {mapListCategoriesQuery, Category} from "../action/CategoriesActions";
import { onCreateProduct } from "../graphql/subscriptions";
import { Button, Modal, Form, Input, Select, Switch } from 'antd';
import { listCategories } from "../graphql/queries";


function CreateProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [visible, setVisible] = useState(false);

    async function addProduct(
        name: string, 
        categoryID: string,
        price: number,
        inStock: boolean){
            try{
                const response = await actionGraphQL<CreateProductMutation>(
                    createProduct, {
                        input: { name, categoryID, price, inStock},
                    } as CreateProductMutationVariables
                );
                console.log('Product Added Response: ', response);
            } catch(error){
                console.log("Error Adding Product: ", error);
            }
    };

    const onCreate = (values: any) => {
      console.log('Received values of form: ', values);
      console.log('Values.name', values.name);
      console.log('Values.categoryID', values.categoryID);
      console.log('Values.price', values.price);
      console.log('Values.inStock', values.inStock);

        try{
            addProduct(
                values.name as string, 
                values.categoryID as string, 
                values.price as number, 
                values.inStock as boolean);
            
            setVisible(false);
        } catch(error){
            console.log('Error Adding new product: ', error);
        }
    };



    function onCreateProductHandler(
        createProducSubscription: OnCreateProductSubscription ){
            const product = mapOnCreateProductSubscription(createProducSubscription);
            setProducts([...products, product]);
        };

    useEffect(() => {
        const subscription = subGraphQL<OnCreateProductSubscription>(
            onCreateProduct,
            onCreateProductHandler
        );
        return () => subscription.unsubscribe();
    },[products]);

    
    async function getCat(){
      try{
        const catData = await actionGraphQL<ListCategoriesQuery>(listCategories);
        const categories = mapListCategoriesQuery(catData);
        setCategories(categories)
        console.log('Category from create Prod: ', categories);
        return categories
      } catch(error){
        console.log('Error getting Categories: ', error);
      }
    }

    useEffect(() =>{
      getCat()
    },[])

    const cat = categories;

    const ProductCreateForm = ({ visible, onCreate, onCancel }: any) => {
        const [form] = Form.useForm();

        return (
          <Modal
            visible={visible}
            title="Add a New Product"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                //   form.resetFields();
                  onCreate(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: 'public',
              }}
            >
              <Form.Item
                id = "name"
                name="name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the product name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item 
                id="categoryID" 
                name="categoryID" 
                label="Select Category">
                <Select>
                  {
                    cat?.map(option => (
                      <Select.Option
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                    </Select.Option>
                    ))
                  } 
                </Select>
              </Form.Item>
              <Form.Item 
                id="price"
                name="price" 
                label="Product Price">
                <Input 
                 />
              </Form.Item>
              <Form.Item 
                id="inStock" 
                name="inStock" 
                label="In Stock?"
                initialValue="false"
                valuePropName="true">
                <Switch 
                />
            </Form.Item>
            </Form>
          </Modal>
        );
      };

    return (
        <div>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            Add Product
          </Button>
          <ProductCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
      );    
}

export default CreateProduct