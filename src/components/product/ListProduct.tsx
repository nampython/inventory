'use client'

import React, {useEffect, useRef, useState} from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Search from "@/components/widgets/Search";
import {format} from "date-fns";
import ReactPaginate from 'react-paginate';
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css"
import Link from "next/link";
import {FaEdit} from "react-icons/fa";
import DeleteModal from "@/components/widgets/DeleteModal";
import {createProduct, deleteProduct} from "@/actions/ProductAction";
import {toast} from "react-toastify";

const ListProduct = ({
                         total,
                         pageNumber,
                         products: data

                     }) => {


    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef(1);
    const [search, setSearch] = useState('');

    const handleSearch = async (e) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('search', 1);

        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    const onDelete = async (id) => {
        const res = await deleteProduct(id);
        console.log(res)

        if (res?.error) {
            toast.error(res?.error)
        }

        if (res?.message) {
            toast.success(res?.message)
        }
    }

    useEffect(() => {
        handleSearch();
    }, [search])


    useEffect(() => {
        if (total > 0) {
            setPageCount(pageNumber)
        }
    }, [pageNumber, total])


    function handlePageClick(e: { selected: number }) {
        console.log(e);
        const params = new URLSearchParams(searchParams.toString());
        if (currentPage.current) {
            params.set('page', (e.selected + 1).toString());
            currentPage.current = e.selected + 1;
            router.replace(`${pathname}?${params.toString()}`);
        }
    }


    return (
        <div>
            <div className="flex-between border-b-[1px] border-gray-400 pb-3">
                <p> {total} products</p>
                <Search
                    placeholder="Search product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Table>
                <TableCaption>A list of your product.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">STT</TableHead>
                        <TableHead className="">Device Id</TableHead>
                        <TableHead className="">Product No</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="">Device Components</TableHead>
                        <TableHead className="">Date</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/*<TableRow>*/}
                    {/*    <TableCell className="font-medium">5123</TableCell>*/}
                    {/*    <TableCell>PN001</TableCell>*/}
                    {/*    <TableCell>Tai nghe Bluetooth XYZ</TableCell>*/}
                    {/*    <TableCell className="">Tai nghe, Cục sạc, Hướng dẫn sử dụng</TableCell>*/}
                    {/*    <TableCell className="">Jul 17, 2024</TableCell>*/}
                    {/*</TableRow>*/}
                    {
                        data?.map(
                            (product, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{product._id ? product._id.slice(-10) : 'N/A'}</TableCell>
                                    <TableCell>{product.productNo}</TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell className="">{product.deviceComponents}</TableCell>
                                    <TableCell
                                        className="">{format(new Date(product.createdAt), "MMM dd, yyyy")}</TableCell>
                                    <TableCell className="font-bold flex space-x-3">

                                        <>
                                         <span>
                                              <Tooltip placement="top"
                                                       trigger={['hover']}
                                                       overlay={<span>Edit your product</span>}>
                                                  <Link href={`/?id=${product._id}`}>
                                                      <FaEdit size={24} color={"green"} className={"cursor-pointer"}>

                                                      </FaEdit>
                                                  </Link>
                                              </Tooltip>
                                        </span>
                                            <span>
                                            <Tooltip placement="top"
                                                     trigger={['hover']}
                                                     overlay={<span>Delete your product</span>}>
                                                  <DeleteModal
                                                      title={"Delete Product"}
                                                      description={"Are you sure you want to delete this product?"}
                                                      pass={"delete"}
                                                      onClick={() => onDelete(product._id)}
                                                  />
                                              </Tooltip>
                                        </span>
                                        </>

                                    </TableCell>
                                    {/*format(new Date(product.createAt), "MMM dd, yyyy")*/}
                                </TableRow>
                            )
                        )
                    }
                </TableBody>
            </Table>

            {data?.length > 0 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}


                    marginPagesDisplayed={5}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeClassName={"activePage"}
                />
            )}

        </div>
    );
};

export default ListProduct;