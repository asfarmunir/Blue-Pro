'use server'
import { connectToDatabase } from "..";
import Product from '@/database/product.modal';
import { revalidatePath } from "next/cache";


export const createProduct = async (product) => {
    try {
        await connectToDatabase();
        const newProduct = await Product.create(product);
        revalidatePath("/iventory");
        return JSON.parse(JSON.stringify({newProduct,status:200}));
    } catch (error) {
        console.error("Create product failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}



export const getAllProducts = async () => {
    try {
        await connectToDatabase();
        const products = await Product.find();
        return JSON.parse(JSON.stringify({products,status:200}));
    } catch (error) {
        console.error("Get all products failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}

export const getProductById = async (id) => {
    try {
        await connectToDatabase();
        const product = await Product.findById(id);
        return JSON.parse(JSON.stringify({product,status:200}));
    } catch (error) {
        console.error("Get product by id failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}

export const updateProduct = async (id,product) => {
    try {
        await connectToDatabase();
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        revalidatePath("/iventory");
        return JSON.parse(JSON.stringify({updatedProduct,status:200}));
    }
    catch (error) {
        console.error("Update product failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}

export const deleteProduct = async (id) => {
    try {
        await connectToDatabase();
        const deletedProduct = await Product.findByIdAndDelete(id);
        revalidatePath("/iventory");
        return JSON.parse(JSON.stringify({deletedProduct,status:200}));
    } catch (error) {
        console.error("Delete product failed", error);
        return JSON.parse(JSON.stringify({error: error.message,status:500}));
    }
}