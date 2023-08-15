"use client";

import Image from "next/image";
import style from "./houseIntro.module.scss";
import Sample from "@/public/images/sale-sample.png";

interface IntroProps {
  images: string[];
  title: string;
  address: string;
  bath: number;
  toliet: number;
  acreage: string;
  home_detail: string;
  price: string;
}

export default function HouseIntro(props: IntroProps) {
  const { images, title, address, bath, toliet, acreage, home_detail, price } =
    props;
  return (
    <div className={style.introContainer}>
      <div className={style.wrapper}>
        <div className={style.imageContainer}>
          {images.map((img, i) => (
            <div
              className={style.img}
              key={`home image: ${i}`}
              style={{ backgroundImage: `url(/houses/${img})` }}
            />
          ))}
        </div>
        <div className={style.info}>
          <div className={style.first}>
            <div className={style.active}>
              <div
                style={{
                  backgroundColor: "#003ede",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              />
              <span>FOR SALE-ACTIVE</span>
            </div>
            <div className={style.address}>{address}</div>
            <div className={style.houseinfo}>
              <div className={style.price}>
                <span>{price}</span>
                <span style={{ fontSize: "10px" }}>
                  Est.$8,750/mo Get pre-approved
                </span>
              </div>
              <div className={style.more}>
                <div className={style.col}>
                  <strong>{bath}</strong>
                  <span>Beds</span>
                </div>
                <div className={style.col}>
                  <strong>{toliet}</strong>
                  <span>Baths</span>
                </div>
                <div className={style.col}>
                  <strong>{acreage}</strong>
                  <span>Sq Ft</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image src={Sample} alt="sample" width={100} height={100} />
          </div>
        </div>
        <div className={style.detail}>
          <h1>This home detail</h1>
          <p>{home_detail}</p>
          <button>start an offer</button>
        </div>
      </div>
    </div>
  );
}
