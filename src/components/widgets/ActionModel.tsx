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


interface ActionModelProps {
    children: React.ReactNode;
    trigger: React.ReactNode;
    title: string;
    description: string;
    btnText: string;
    onClick: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}


const ActionModel: React.FC<ActionModelProps> = ({
                                                     children,
                                                     trigger,
                                                     title,
                                                     description,
                                                     btnText,
                                                     onClick,
                                                     open,
                                                     setOpen
                                                 }) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {children}
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    {btnText && (
                        <AlertDialogAction
                            onClick={() => {
                                onClick();
                            }}
                        >
                            {btnText}
                        </AlertDialogAction>
                    )}


                    {/*<AlertDialogAction>Continue</AlertDialogAction>*/}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default ActionModel;