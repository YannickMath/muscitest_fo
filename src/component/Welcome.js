'use client'
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Welcome() {
const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const handleLoginButton = () => {
        setModal(true);
    }

    const handleLoginSubmit = () => {
        setModal(false);

        dispatch({
            type: "ADD_USERNAME_TO_STORE",
            payload: "John Doe",
        });

    }



    return (
        <div class="p-5">
            <h1>Home Page</h1>
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleLoginSubmit}
            >
                Button
            </button>
            {modal && <Modal setModal={setModal}/>}
        </div>
    );
}
