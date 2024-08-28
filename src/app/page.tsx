import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import CreateProduct from "@/components/product/CreateProduct";
import ListProduct from "@/components/product/ListProduct";

export default function Home() {
    return (
        <div className='flex justify-center min-h-[82vh]'>
            <section className='w-full px-2 max-w-[1200px]'>
                <div className='flex justify-between'>
                    <h3 className='text-2xl font-semibold'>
                        Inventory Management System
                    </h3>
                    <CreateProduct />
                </div>

                <Separator className='mt-10 border border-gray-300 rounded' />

                <ListProduct />


            </section>
        </div>
    );
}
