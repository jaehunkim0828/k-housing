"use client";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import style from "./header.module.scss";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { buyType } from "@/state/buy";

export default function Header() {
  const router = useRouter();
  const setType = useSetRecoilState(buyType);

  const onRouter = (page: string) => {
    router.push(page);
  };
  return (
    <header className={style.headerContainer}>
      <nav>
        <div
          onClick={() => {
            setType("sale");
            onRouter("/houses");
          }}
        >
          BUY
        </div>
        <div
          onClick={() => {
            setType("/rent");
            onRouter("/houses");
          }}
        >
          RENT
        </div>
        <div onClick={() => onRouter("/premium")}>PREMIUM</div>
        <div onClick={() => onRouter("/order")}>BUY ORDER</div>
      </nav>
      <Image
        onClick={() => router.replace("/")}
        className={style.logo}
        src={Logo}
        alt="logo"
        width={200}
        height={50}
      />
      <button>login</button>
    </header>
  );
}
