"use client";

import React from "react";
import Container from "@/app/components/Container";
import Logo from "@/app/components/Navbar/Logo";
import Search from "@/app/components/Navbar/Search";
import UserMenu from "@/app/components/Navbar/UserMenu";

import {safeUser} from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: safeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row justify-between items-center gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
