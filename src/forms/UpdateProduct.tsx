import React, {useState, useEffect} from "react";
import actionGraphQL from "../action/GraphQlWrapper";
import { updateProduct } from "../graphql/mutations";
import { ListCategoriesQuery } from "../API";
import {mapListCategoriesQuery, Category} from "../action/CategoriesActions";
import { UpdateProductMutation, UpdateProductMutationVariables } from "../API";
import { Product } from "../action/ProductsActions";
import { Modal, Form, Input, Select, Switch } from 'antd';
import { listCategories } from "../graphql/queries";
import { EditTwoTone } from "@ant-design/icons";

function UpdateProduct(){
    const [product, setProduct] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [visible, setVisible] = useState(false);

    async function productUpdate(
        id: string,
        name: string,
        categoryID: string,
        price: number,
        inStock: boolean){  

            try{
                const response = await actionGraphQL<UpdateProductMutation>(
                    updateProduct, {
                        input: {id, name, categoryID, price, inStock}
                    } as UpdateProductMutationVariables
                );
                console.log('Product update response: ', response);
            }catch(error){
                console.log('Error updating item: ', error);
            }
    };

    const onUpdate = (values: any) =>{
        try{
            productUpdate(
                values.id as string,
                values.name as string,
                values.categoryID as string,
                values.price as number,
                values.inStock as boolean
               
            ) 
            setVisible(false);
        }catch(error){
            console.log("updating error: ", error);
        }
    };

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

    const ProductUpdateForm = ({ visible, onCreate, onCancel }: any) => {
        const [form] = Form.useForm();

        return (
          <Modal
            visible={visible}
            title="Update Product"
            okText="Update"
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
        <>
          <a onClick={() =>{setVisible(true);}}><EditTwoTone /></a>
          <ProductUpdateForm
            visible={visible}
            onCreate={onUpdate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </>
      );    


};

export default UpdateProduct;