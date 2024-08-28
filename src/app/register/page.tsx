import React from 'react';
import RegisterForm from "@/app/register/register-form";

const Page = () => {
    return (
        <div>
            <h1 className='text-xl text-center font-semibold'>Register</h1>
            <div className='flex justify-center'>
                <RegisterForm/>
            </div>
        </div>

    );
};

export default Page;