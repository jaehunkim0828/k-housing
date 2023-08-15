"use client";

import Image from "next/image";
import style from "./footer.module.scss";

import Google from "@/public/images/google.png";
import Apple from "@/public/images/apple.png";
import Social from "@/public/images/social.png";
import FImg from "@/public/images/footerImg.png";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/houses" ? (
        <footer className={style.footerContainer}>
          <div className={style.wrapper}>
            <div className={style.form}>
              <h3>Join us</h3>
              <div className={style.list}>
                <div>Become an Agent</div>
                <div>Get referrals</div>
                <div>Careers</div>
              </div>
              <h3>Find homes faster</h3>
              <div className={style.list}>
                <div className={style.image}>
                  <Image src={Google} alt="google" layout="responsive" />
                </div>
                <div className={style.image}>
                  <Image src={Apple} alt="apple" layout="responsive" />
                </div>
              </div>
            </div>
            <div className={style.form}>
              <h3>About As</h3>
              <div className={style.list}>
                <div>Why K-Housing?</div>
                <div>Community Impact</div>
                <div>Diversity & Inclusion</div>
                <div>Life at KH</div>
                <div>Press</div>
                <div>Investors</div>
                <div>Blogs</div>
                <div>Real Estate News</div>
              </div>
            </div>
            <div className={style.form}>
              <h3>Find us</h3>
              <div className={style.list}>
                <div>KH App</div>
                <div>Contact Us</div>
                <div>Help Center</div>
              </div>
              <div className={style.list}>
                <Image src={Social} alt="google" width={100} height={30} />
              </div>
              <div className={style.list}>
                <Image src={FImg} alt="google" width={80} height={60} />
              </div>
            </div>
          </div>
        </footer>
      ) : (
        <></>
      )}
    </>
  );
}
