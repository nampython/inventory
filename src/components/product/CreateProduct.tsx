'use client';

import React from 'react';
import ActionModel from "@/components/widgets/ActionModel";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import Link from "next/link";
import {Input} from "@/components/ui/input";
import {useRouter, useSearchParams} from "next/navigation";
import {createProduct} from "@/actions/ProductAction";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LoadingButton} from "@/components/widgets/Loader";


const products = [
    {
        productNo: 1,
        productName: 'John Doe',
        // email: 'john@gmail.com'
    },
    {
        productNo: 2,
        productName: 'Jane Doe',
        // email: 'done@gmail.com',
    },
    {
        productNo: 3,
        productName: 'Nam Dinh',
        // email: 'nam@gmail.com'
    }
]

const formSchema = z.object({
    productNo: z.string().min(2, {
        message: "Product No is required",
    }),
    productName: z.string().min(2, {
        message: "Product Name is required",
    }),
    deviceComponents: z.string().min(2, {
        message: "Product Name is required",
    }),
    // amount: z.string().min(2, {
    //     message: "Amount is required",
    // }),
})

const CreateProduct = () => {

    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productNo: "",
            productName: "",
            deviceComponents: "",
            // amount: "Unpaid",
        },
    })

    const idLoading = form.formState.isSubmitting;


    async function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)

        const {productNo, productName, deviceComponents} = values;


        const formDate = {productNo, productName, deviceComponents}


        if (id) {
            // update
        } else {
            // create
            const res = await createProduct(formDate);
            console.log(res)

            if (res?.error) {
                toast.error(res?.error)
            }

            if (res?.message) {
                toast.success(res?.message)
            }
        }

        form.reset()
        setOpen(false)
        router.push('/')
    }


    return (
        <div>
            <ActionModel
                title='Create Product'
                description='Create new product'
                trigger={
                    <Button className='text-white space-x-1'>
                        <span>Create Product</span>
                        <span className='text-lg'></span>
                    </Button>
                }
                open={open}
                setOpen={setOpen}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-10">
                        <FormField
                            control={form.control}
                            name="productNo"
                            render={({field}) => (
                                <FormItem>
                                    {/*<FormLabel>Product No</FormLabel>*/}
                                    {/*<Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                                    {/*    <FormControl>*/}
                                    {/*        <SelectTrigger>*/}
                                    {/*            <SelectValue placeholder="Select a verified email to display"/>*/}
                                    {/*        </SelectTrigger>*/}
                                    {/*    </FormControl>*/}
                                    {/*    <SelectContent>*/}
                                    {/*        <SelectItem value="m@example.com">m@example.com</SelectItem>*/}
                                    {/*        <SelectItem value="m@google.com">m@google.com</SelectItem>*/}
                                    {/*        <SelectItem value="m@support.com">m@support.com</SelectItem>*/}
                                    {/*    </SelectContent>*/}
                                    {/*</Select>*/}
                                    {/*/!*<FormDescription>*!/*/}
                                    {/*/!*    You can manage email addresses in your{" "}*!/*/}
                                    {/*/!*    <Link href="/examples/forms">email settings</Link>.*!/*/}
                                    {/*/!*</FormDescription>*!/*/}
                                    {/*<FormMessage/>*/}
                                    <FormLabel>Product No</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type your product name" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>*/}
                                    {/*    This is your public display name.*/}
                                    {/*</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type your product name" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>*/}
                                    {/*    This is your public display name.*/}
                                    {/*</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="deviceComponents"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Device Components</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type your device components" {...field} />
                                    </FormControl>
                                    {/*<FormDescription>*/}
                                    {/*    This is your public display name.*/}
                                    {/*</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        {idLoading ?
                            (<LoadingButton btnText={"Loading"} btnClass="w-full" btnVariant={"outline"}/>)
                            :
                            (<Button className="w-full" type="submit">Submit</Button>)
                        }


                    </form>
                </Form>
            </ActionModel>
        </div>
    );
};

export default CreateProduct;