import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2 px-10">
      <Link href="/">
        <Image priority src="/logo.png" alt="profilepic" width={150} height={100} />
      </Link>
      <div className="w-10 rounded-full">
        <Image priority src="/avatar.svg" alt="profilepic" width={40} height={40} />
      </div>
    </div>
  );
};

export default Navbar;
