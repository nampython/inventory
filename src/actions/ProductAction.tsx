'use server'

import connectDB from "@/lib/mongodb";
import Product from "@/models/ProductModel";
import {revalidatePath} from "next/cache";

export const getErrorMessage = (error) => {
    let message;

    if (error instanceof Error) {
        message = error.message
    } else if (error && typeof error === 'object' && "message" in error) {
        message = String(error.message)
    } else if (typeof error === 'string') {
        message = error
    } else {
        message = "Something went wrong"
    }

    return message;
}


export const createProduct = async (formData) => {
    const {productNo, ProductName} = formData;
    try {
        if (!productNo || !ProductName) {
            return {
                status: false,
                message: 'All fields are required'
            }
        }


        await connectDB()
        await Product.create({
            productNo,
            ProductName
        })

        revalidatePath("/")


        return {
            message: 'Product created successfully',
        }


    } catch (error) {
        console.log(error)
        return {
            error: getErrorMessage(error)
        }
    }
}