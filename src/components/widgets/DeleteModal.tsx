'use client'

import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {FaTrashAlt} from "react-icons/fa";
import {Input} from "@/components/ui/input";


interface ActionModelProps {

    title: string;
    description: string;
    pass: string;
    onClick: () => void;

}


const DeleteModal: React.FC<ActionModelProps> = ({
                                                     title,
                                                     description,
                                                     pass,
                                                     onClick,
                                                 }) => {

    const [keyword, setKeyword] = React.useState('');
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <FaTrashAlt size={22} color={'red'} className={'cursor-pointer'}></FaTrashAlt>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                    <p>
                        To Delete this product, <b>{pass}</b> in the input field below
                    </p>
                    <Input
                        className={'border-red-600'}
                        type={'text'}
                        placeholder={'Enter the keyword'}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    ></Input>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    {keyword === pass && (
                        <AlertDialogAction
                            onClick={() => {
                                onClick();
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    )}


                    {/*<AlertDialogAction>Continue</AlertDialogAction>*/}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default DeleteModal;