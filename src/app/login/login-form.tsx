"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import {LoginBody, LoginType,} from '@/app/schemavalidation/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import envConfig from '@/app/config';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Button} from "@/components/ui/button";

const LoginForm = () => {

    const form = useForm<LoginType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: LoginType) {
        const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/login`, {
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((res) => res.json());

        console.log(response);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] flex-shrink-0 w-full" noValidate>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Please enter your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Please enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="!mt-10 w-full" type="submit">
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;