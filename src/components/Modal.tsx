import { useRef, useImperativeHandle, forwardRef } from 'react';

const Modal = forwardRef(function Modal(
    {
        title,
        handleYes,
        children,
    }: {
        title: string;
        handleYes: (event: React.MouseEvent<HTMLElement>) => Promise<void>;
        children: React.ReactNode;
    },
    ref
) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            dialogRef.current?.showModal();
        },
        close: () => {
            dialogRef.current?.close();
        },
    }));

    async function submitYes(event: React.MouseEvent<HTMLElement>) {
        await handleYes(event);
        console.log('yes');
        dialogRef.current?.close();
    }

    return (
        <dialog ref={dialogRef} className="p-8 rounded-xl bg-neutral-600 backdrop-blur-2xl backdrop:bg-black/50">
            <h1 className="text-3xl uppercase font-bold mb-4 text-white">{title}</h1>
            <p className="text-center mb-4 text-white">{children}</p>
            <div className="flex justify-around">
                <button onClick={(e) => submitYes(e)} className="bg-green-500 text-white px-4 py-1 rounded text-xl">
                    Yes
                </button>
                <button onClick={() => dialogRef.current?.close()} className='bg-red-500 px-4 py-1 rounded text-white text-xl'>No</button>
            </div>
        </dialog>
    );
});

export default Modal;
