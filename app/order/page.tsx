import style from "@/styles/order.module.scss";
import Image from "next/image";
import Order from "@/public/images/order.png";
import Search from "@/public/svg/search";

export default function OrderPage() {
  return (
    <main className={style.orderContainer}>
      <div className={style.first}>
        <div className={style.wrapper2}>
          <div className={style.context}>
            <h1>The best way to buy a home</h1>
            <span>
              we’ve paired our top-rated home search app with the best agents in
              real estate-so you have everything you need to find the home of
              your dreams
            </span>
            <div className={style.btns}>
              <button>Buy</button>
              <button>Rent</button>
            </div>
          </div>
          <div className={style.orderImg}>
            <Image src={Order} alt="order" layout="responsive" />
          </div>
        </div>
      </div>
      <div className={style.emailForm}>
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className={style.context}>
              <div>
                <h1>Contact a K-Housing agent</h1>
                <h1>for individualized assistamce</h1>
              </div>
              <div>
                <span>
                  we’ve paired our top-rated home search app with the best
                  agents in real estate-so you have everything you need to find
                  the home of your dreams
                </span>
              </div>
            </div>
            <form className={style.form}>
              <div className={style.part}>
                <label>Where are you searching for homes?</label>
                <input placeholder="Seoul" />
                <div className={style.searchBtn}>
                  <Search />
                </div>
              </div>
              <div className={style.btns}>
                <button>pre-sale property</button>
                <button>post-sale property</button>
              </div>
              <div className={style.part}>
                <label>
                  Home type<span style={{ color: "red" }}>*</span>
                </label>
                <input placeholder="apart" />
              </div>
              <div className={style.part}>
                <label>
                  Price<span style={{ color: "red" }}>*</span>
                </label>
                <input placeholder="$ 0~100" />
              </div>
              <div className={style.part}>
                <label>
                  Bed/Bath<span style={{ color: "red" }}>*</span>
                </label>
                <input placeholder="1/2" />
              </div>
              <div className={style.part}>
                <label>
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input placeholder="khousing@K_housing.com" />
              </div>
              <div className={style.part}>
                <label>
                  Phone<span style={{ color: "red" }}>*</span>
                </label>
                <input placeholder="(  )+" />
              </div>
            </form>
          </div>
          <div className={style.help}>
            <h1>
              What can we help you with?<strong>*</strong>
            </h1>
            <textarea placeholder="I’m interested in buying,seling or a free consult with a KH agent" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </main>
  );
}
