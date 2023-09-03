import React from 'react';
import Image from "next/image";

const Avatar = () => {
    return (
        <Image className={"rounded-full hidden sm:block"} width={30} height={30} src={'/images/placeholder.jpg'} alt={"Avatar"} />
    );
};

export default Avatar;