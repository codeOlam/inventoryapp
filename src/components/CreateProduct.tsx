import React, { useState, FormEvent, useEffect } from "react";
import actionGraphQL, { subGraphQL } from "../action/GraphQlWrapper";
import { createProduct } from "../graphql/mutations";
import { CreateProductMutation, CreateProductMutationVariables, OnCreateProductSubscription } from "../API";
import { mapOnCreateProductSubscription, Product } from "../action/ProductsActions";
import { onCreateProduct } from "../graphql/subscriptions";

const CreateProduct = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [name, setName] = useState<string>('');
    const [categoryID, setCategoryID] = useState<string>('');
    const [price, setPrice] = useState<number>(0.00);
    const [inStock, setInStock] = useState<boolean>(true);

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
                console.log('response: ', response);
            } catch(error){
                console.log("Error Adding Product: ", error);
            }
        };

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (!!name && !!categoryID && !!price && !!inStock ){
            addProduct(name, categoryID, price, inStock);
        }

        setName("");
        setCategoryID("");
        setPrice(0.00);
        setInStock(true);
    };

    function onCreateProductHandler(
        createProducSubscription: OnCreateProductSubscription ){
            const product = mapOnCreateProductSubscription(createProducSubscription);
            setProducts([...products, product]);
        };
    
    function sub(){
        const subscription = subGraphQL<OnCreateProductSubscription>(
            onCreateProduct,
            onCreateProductHandler
        );

        return subscription.unsubscribe();
    }

    useEffect(() => {
        sub()
    },[products])

    return (
        <form onSubmit={submit}>
            <div>
                <label>
                    Product Name:
                    <input id="name" name="name" type="text"
                        onChange={(event) =>setName(event.target.value)} />
                </label>
                <label>
                    Product Category:
                    <input id="name" name="name" type="text"
                        onChange={(event) =>setCategoryID(event.target.value)} />
                </label>
                <label>
                    Product Price:
                    <input id="name" name="name" type="text"
                        onChange={(event) =>setPrice(event.target.value as unknown as number)} />
                </label>
                <label>
                    In Stock?:
                    <input id="name" name="name" type="text"
                        onChange={(event) =>setInStock(event.target.value as unknown as boolean)} />
                </label>
            </div>
            <button type="submit">Add Product</button>
        </form>
    )
}

export default CreateProduct