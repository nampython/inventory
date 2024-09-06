import {Separator} from "@/components/ui/separator";
import CreateProduct from "@/components/product/CreateProduct";
import ListProduct from "@/components/product/ListProduct";
import {getProducts} from "@/actions/ProductAction";

export default async function Home({searchParams}) {
    const search = searchParams?.search || '';
    const page = searchParams?.page || 1;

    const res = await getProducts({
        search,
        page,
        limit: 10
    })

    const products = JSON.parse(res) || [];
    console.log(products)


    return (
        <div className='flex justify-center min-h-[82vh]'>
            <section className='w-full px-2 max-w-[1200px]'>
                <div className='flex justify-between'>
                    <h3 className='text-2xl font-semibold'>
                        Inventory Management System
                    </h3>
                    <CreateProduct/>
                </div>

                <Separator className='mt-10 border border-gray-300 rounded'/>

                <ListProduct
                    total={products.total}
                    pageNumber={products.pageCount}
                    products={products.data}
                />


            </section>
        </div>
    );
}
