import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FakeGamesList() {
    return (
        <ul className="flex flex-wrap gap-4 mx-4 justify-center animate-pulse">
            <li className="w-96 bg-neutral-800 p-6 rounded-xl hover:bg-blue-900 hover:bg-transparent">
                <div className="w-full aspect-square mb-2 rounded-xl bg-neutral-700/50" />
                <div className="text-2xl font-bold uppercase bg-neutral-700/50 rounded-xl h-8"></div>
                <div className="flex justify-between mt-2">
                    <div className="text-xl bg-neutral-700/50 h-6 rounded-xl w-8"></div>
                    <button className="hover:bg-transparent">
                        <FontAwesomeIcon
                            className="text-2xl text-neutral-700/50"
                            icon={'heart-circle-plus'}
                        />
                    </button>
                </div>
            </li>
            <li className="w-96 bg-neutral-800 p-6 rounded-xl hover:bg-blue-900 hover:bg-transparent">
                <div className="w-full aspect-square mb-2 rounded-xl bg-neutral-700/50" />
                <div className="text-2xl font-bold uppercase bg-neutral-700/50 rounded-xl h-8"></div>
                <div className="flex justify-between mt-2">
                    <div className="text-xl bg-neutral-700/50 h-6 rounded-xl w-8"></div>
                    <button className="hover:bg-transparent">
                        <FontAwesomeIcon
                            className="text-2xl text-neutral-700/50"
                            icon={'heart-circle-plus'}
                        />
                    </button>
                </div>
            </li>
            <li className="w-96 bg-neutral-800 p-6 rounded-xl hover:bg-blue-900 hover:bg-transparent">
                <div className="w-full aspect-square mb-2 rounded-xl bg-neutral-700/50" />
                <div className="text-2xl font-bold uppercase bg-neutral-700/50 rounded-xl h-8"></div>
                <div className="flex justify-between mt-2">
                    <div className="text-xl bg-neutral-700/50 h-6 rounded-xl w-8"></div>
                    <button className="hover:bg-transparent">
                        <FontAwesomeIcon
                            className="text-2xl text-neutral-700/50"
                            icon={'heart-circle-plus'}
                        />
                    </button>
                </div>
            </li>
            <li className="w-96 bg-neutral-800 p-6 rounded-xl hover:bg-blue-900 hover:bg-transparent">
                <div className="w-full aspect-square mb-2 rounded-xl bg-neutral-700/50" />
                <div className="text-2xl font-bold uppercase bg-neutral-700/50 rounded-xl h-8"></div>
                <div className="flex justify-between mt-2">
                    <div className="text-xl bg-neutral-700/50 h-6 rounded-xl w-8"></div>
                    <button className="hover:bg-transparent">
                        <FontAwesomeIcon
                            className="text-2xl text-neutral-700/50"
                            icon={'heart-circle-plus'}
                        />
                    </button>
                </div>
            </li>
        </ul>
    );
}
