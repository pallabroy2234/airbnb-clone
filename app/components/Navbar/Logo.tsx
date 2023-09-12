"use client";
import React from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return <Image onClick={() => router.push("/")} alt='logo' width={100} height={100} src='/images/logo.png' className={"hidden sm:block cursor-pointer"} />;
};

export default Logo;
