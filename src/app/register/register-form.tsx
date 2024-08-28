"use client"

import React from 'react';
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {RegisterBody, RegisterType} from "@/app/schemavalidation/auth.schema";
import envConfig from "@/app/config";



const RegisterForm = () => {


    const form = useForm<RegisterType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            passwordConfirmation: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: RegisterType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => res.json())

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, errors => {
                console.log({errors})
            })} className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
                  noValidate>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Please enter your email" type={"email"}{...field} />
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
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Please enter your name" {...field} />
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
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Please enter your password" type={"password"}{...field} />
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
                    name="passwordConfirmation"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>PasswordConfirm</FormLabel>
                            <FormControl>
                                <Input placeholder="Please enter your confirm password" type="password" {...field} />
                            </FormControl>
                            {/*<FormDescription>*/}
                            {/*    This is your public display name.*/}
                            {/*</FormDescription>*/}
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className='!mt-10 w-full' type="submit">Register</Button>
            </form>
        </Form>
    )
};

export default RegisterForm;