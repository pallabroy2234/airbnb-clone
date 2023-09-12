import React from "react";
import Image from "next/image";

interface AvaterProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvaterProps> = ({src}) => {
  return <Image className={"rounded-full hidden sm:block"} width={30} height={30} src={src || "/images/placeholder.jpg"} alt={"Avatar"} />;
};

export default Avatar;
