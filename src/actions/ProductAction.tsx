'use server'

import connectDB from "@/lib/mongodb";
import Product from "@/models/ProductModel";
import {revalidatePath} from "next/cache";

export const getErrorMessage = async function (error) {
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
    const {productNo, productName} = formData;
    try {
        if (!productNo || !productName) {
            return {
                status: false,
                message: 'All fields are required'
            }
        }

        await connectDB()
        await Product.create({
            productNo,
            productName
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

export const getProducts = async (params) => {
    console.log('params', params)
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;
    const query = {
        ...(params.search && {
            $or: [
                // {productNo: {$regex: params.search, $options: 'i'}},
                {productName: {$regex: params.search, $options: 'i'}},
            ]
        })
    }

    await connectDB();
    const products = await Product
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({createAt: -1});

    const total = await Product.countDocuments(query);
    const pageCount = Math.ceil(total / limit);

    return JSON.stringify({
        total,
        pageCount,
        data: products,
    })

};

export const deleteProduct = async (id) => {
    try {
        await connectDB();
        await Product.findByIdAndDelete(id);
        revalidatePath("/")
        return {
            message: 'Product deleted successfully'
        }
    } catch (error) {
        return {
            error: getErrorMessage(error),
        }
    }
}


export const getProduct = async (id) => {
    try {
        await connectDB();
        const product = await Product.findById(id);
        return JSON.stringify(product)
    } catch (error) {
        return {
            error: getErrorMessage(error),
        }
    }
}

export const updateProduct = async (formData) => {
    const {id, productNo, productName,} = formData;


    try {
        await connectDB();
        await Product.findByIdAndUpdate(id, {
            productNo,
            productName,
        })
        revalidatePath("/")

        return {
            message: 'Product updated successfully'
        }
    } catch (error) {
        return {
            error: getErrorMessage(error),
        }
    }
};