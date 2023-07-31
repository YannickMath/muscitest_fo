import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsernameToStore } from "@/reducer/user.slice";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

export default function Welcome({isDarkMode, setIsDarkMode, toogleDarkMode}) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  // console.log("username: ", username)

  const [modal, setModal] = useState(false);
  const [userName, setUserName] = useState("");
  // const [isDarkMode, setIsDarkMode] = useState(false);

  const handleOnChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleLoginButton = () => {
    setModal(true);
  };

  const handleLoginSubmit = () => {
    setModal(false);
    dispatch(addUsernameToStore(userName));
  };
  // const toogleDarkMode = () => {
  //   const newDarkMode = !isDarkMode;
  //   setIsDarkMode(newDarkMode);
  //   if (newDarkMode) {
  //     document.body.classList.add("dark");
  //   } else {
  //     document.body.classList.remove("dark");
  //   }
  // };
  console.log("isDarkMode: ", isDarkMode);

  return (
    <div className="h-screen w-full p-5 dark:bg-black bg-white">
      <h1>Home Page</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleLoginButton}
      >
        Button
      </button>
      {modal && (
        <Modal
          setModal={setModal}
          handleLoginSubmit={handleLoginSubmit}
          handleOnChangeUserName={handleOnChangeUserName}
          userName={userName}
          setUserName={setUserName}
        />
      )}
      <div>
        {!isDarkMode ? (
          <MdDarkMode
            className=" hover:cursor-pointer  "
            onClick={toogleDarkMode}
          />
        ) : (
          <MdOutlineDarkMode
            className=" hover:cursor-pointer dark:text-white "
            onClick={toogleDarkMode}
          />
        )}
      </div>
    </div>
  );
}
