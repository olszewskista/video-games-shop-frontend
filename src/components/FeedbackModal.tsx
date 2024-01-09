import { useRef, useImperativeHandle, forwardRef } from 'react';

const FeedbackModal = forwardRef(function FeedbackModal(
    {
        title,
        isPositive,
        onClick = () => {},
        content,
    }: {
        title: string;
        isPositive: boolean;
        content: string;
        onClick?: () => void;
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

    return (
        <dialog
            ref={dialogRef}
            className="p-8 rounded-xl bg-neutral-600 backdrop:bg-neutral-900/75 text-center"
        >
            <h1 className={"text-3xl uppercase font-bold mb-4 " + (isPositive ? 'text-green-500' : 'text-red-500')}>
                {title}
            </h1>
            <p className="text-center mb-4 text-white">{content}</p>
            <form
                method="dialog"
                onSubmit={() => {
                    onClick()
                    dialogRef.current?.close()
                }}
                className="flex justify-center"
            >
                <button className="bg-neutral-500 px-4 py-1 rounded text-white text-xl">
                    OK
                </button>
            </form>
        </dialog>
    );
});

export default FeedbackModal;
