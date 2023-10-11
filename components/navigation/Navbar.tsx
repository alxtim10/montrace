import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = ({link}: any) => {
  return (
    <div className="flex justify-center items-center py-5 px-10">
      <Link href={`/${link}`}>
        <Image priority src="/logo.png" alt="profilepic" width={150} height={100} />
      </Link>
    </div>
  );
};

export default Navbar;
