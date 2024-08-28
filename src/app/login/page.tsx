import React from 'react';
import LoginForm from "@/app/login/login-form";

const Page = () => {
    return (
        <div>
            <h1 className='text-xl text-center font-semibold'>Login</h1>
            <div className='flex justify-center'>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Page;