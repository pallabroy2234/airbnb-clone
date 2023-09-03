"use client";
import React, {useCallback, useState} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/Navbar/MenuItem";
import userRegisterModal from "@/app/hooks/userRegister";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = userRegisterModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value: boolean) => !value);
  }, []);

  return (
    <div className={"relative"}>
      <div className={"flex flex-row items-center gap-3"}>
        <div onClick={() => {}} className={"hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer duration-300"}>
          Airbnb You Home
        </div>

        <div onClick={toggleOpen} className={"p-4  md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row rounded-full items-center cursor-pointer hover:shadow-md transition-"}>
          <AiOutlineMenu />
        </div>

        <div>
          <Avatar />
        </div>
      </div>

      {isOpen && (
        <div className={"absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"}>
          <div className={"flex flex-col cursor-pointer"}>
            <>
              <MenuItem onClick={() => {}} label={"Log In"} />
              <MenuItem onClick={registerModal.onOpen} label={"SignUp"} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
