/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

import Image from "next/image";
import style from "@/styles/home.module.scss";
import ActionCard from "@/components/action-card/actionCard";

import Search from "@/public/svg/search";
import Home1 from "@/public/images/Rectangle15.png";
import Home2 from "@/public/images/Rectangle16.png";
import Home3 from "@/public/images/Rectangle17.png";
import Action1 from "@/public/images/Rectangle19.png";
import Action2 from "@/public/images/Rectangle20.png";
import Action3 from "@/public/images/Rectangle21.png";
import MainImage from "@/public/images/main2.jpeg";
import { useRouter } from "next/navigation";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <main className={style.homeContainer}>
      <section className={style.landingSearch}>
        <div className={style.mainImg}>
          <Image src={MainImage} alt="main" />
        </div>
        <div className={style.search}>
          <input
            value={search}
            onChange={onChange}
            placeholder="Enter an address, city or neighborhood"
          />
          <div
            className={style.searchBtn}
            onClick={() => router.push(`/houses?local=${search}`)}
          >
            <Search />
          </div>
        </div>
      </section>
      <section className={style.descSection}>
        <div className={style.wrapper}>
          <div className={style.login}>
            <h1>Explore home suggestions</h1>
            <span>Make your experience unique by signing in</span>
            <button>Sign in</button>
          </div>
          <div className={style.images}>
            <div className={style.descImage}>
              <Image src={Home1} layout="responsive" alt="logo1" />
            </div>
            <div className={style.descImage}>
              <Image src={Home2} layout="responsive" alt="logo2" />
            </div>
            <div className={style.descImage}>
              <Image src={Home3} layout="responsive" alt="logo3" />
            </div>
          </div>
        </div>
      </section>
      <section className={style.saleSection}>
        <div className={style.wrapper}>
          <ActionCard
            src={Action1}
            title="BUY"
            desc="K·Housing World selects the smartest and most high-end houses, shops, hotels, buildings, resorts, etc. "
            btn="Explore Houses"
            path="houses"
          />
          <ActionCard
            src={Action2}
            title="RENT"
            desc="Explore the highest quality rental homes recommended by Korea's top professionals."
            btn="check the lists"
            path="rent"
          />
          <ActionCard
            src={Action3}
            title="BUY ORDER"
            desc={`Effortlessly find your dream home at K Housing World. Click on the "Buy Order" section for quick searches`}
            btn="Place your order"
            path="order"
          />
        </div>
      </section>
    </main>
  );
}
