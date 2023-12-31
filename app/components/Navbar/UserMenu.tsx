"use client";
import {useCallback, useState} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import MenuItem from "@/app/components/Navbar/MenuItem";
import userRegisterModal from "@/app/hooks/userRegister";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import {signOut} from "next-auth/react";
import {safeUser} from "@/app/types";

interface UserMenuProps {
  currentUser?: safeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = userRegisterModal();
  const logInModal = useLoginModal();
  const rentModal = useRentModal();

  // Menu toggle handler
  const toggleOpen = useCallback(() => {
    setIsOpen((value: boolean) => !value);
  }, []);

  // Rent modal handler
  const onRent = useCallback(() => {
    if (!currentUser) {
      return logInModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, logInModal, rentModal]);
  return (
    <div className={"relative"}>
      <div className={"flex flex-row items-center gap-3"}>
        <div onClick={onRent} className={"hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer duration-300"}>
          Airbnb You Home
        </div>

        <div onClick={toggleOpen} className={"p-4  md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row rounded-full items-center cursor-pointer hover:shadow-md transition-"}>
          <AiOutlineMenu />
        </div>

        <div>
          <Avatar src={currentUser?.image} />
        </div>
      </div>

      {isOpen && (
        <div className={"absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"}>
          <div className={"flex flex-col cursor-pointer"}>
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label={"My trips"} />
                <MenuItem onClick={() => {}} label={"My favorites"} />
                <MenuItem onClick={() => {}} label={"My reservations"} />
                <MenuItem onClick={() => {}} label={"My properties"} />
                <MenuItem onClick={rentModal.onOpen} label={"Airbnb my home"} />
                <hr />
                <MenuItem onClick={() => signOut()} label={"Logout"} />
              </>
            ) : (
              <>
                <MenuItem onClick={logInModal.onOpen} label={"Log In"} />
                <MenuItem onClick={registerModal.onOpen} label={"SignUp"} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
