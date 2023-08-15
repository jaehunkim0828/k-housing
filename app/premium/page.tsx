"use client";

import style from "@/styles/premium.module.scss";
import Image from "next/image";
import Premium from "@/public/images/premium.png";
import Search from "@/public/svg/search";
import HouseCard from "@/components/house-card/houseCard";
import data from "@/data.json";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const router = useRouter();

  return (
    <main className={style.premiumContainer}>
      <div className={style.premium}>
        <div className={style.preminumImg}>
          <Image
            src={Premium}
            alt="premium"
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className={style.context}>
          <div className={style.top}>
            <strong>KH</strong>
            <span>PREMIUM</span>
          </div>
          <div className={style.bottom}>
            <div>
              <div>The High Level of</div>
              <div>{`service from K-Housing's best`}</div>
            </div>
            <div>SEOUL</div>
          </div>
        </div>
      </div>
      <div className={style.searchContainer}>
        <div className={style.wrapper}>
          <div className={style.searchContext}>
            <span>Ready to sell? We’ll help you make</span>
            <span>the most money possible.</span>
          </div>
          <div className={style.searchBar}>
            <div className={style.text}>
              Schedule a consultation with a KHW Premier agent.
            </div>
            <div className={style.inputContainer}>
              <input placeholder="Enter your street address" />
              <div className={style.searchBtn}>
                <Search />
              </div>
              <span>
                KH Premier not available in all markets or for all homes.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.goods}>
        <div className={style.wrapper}>
          <div className={style.list}>
            <div className={style.title}>Efficiency apartment</div>
            <div className={style.cards}>
              {data.sale.slice(0, 3).map((e, i) => (
                <div
                  className={style.card}
                  onClick={() =>
                    router.push(`/sale/${e.name.replaceAll(" ", "-")}`)
                  }
                  key={`Efficiency: ${i}`}
                >
                  <HouseCard
                    src={`houses/${e.images[0]}`}
                    price={e.price}
                    address={e.address}
                    size={220}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={style.list}>
            <div className={style.title}>Apartment/Hotel</div>
            <div className={style.cards}>
              {data.sale.slice(3, 6).map((e, i) => (
                <div
                  className={style.card}
                  onClick={() =>
                    router.push(`/sale/${e.name.replaceAll(" ", "-")}`)
                  }
                  key={`Apartment: ${i}`}
                >
                  <HouseCard
                    src={`houses/${e.images[0]}`}
                    price={e.price}
                    address={e.address}
                    size={220}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={style.list}>
            <div className={style.title}>Town house</div>
            <div className={style.cards}>
              {data.sale.slice(6, 9).map((e, i) => (
                <div
                  className={style.card}
                  onClick={() =>
                    router.push(`/sale/${e.name.replaceAll(" ", "-")}`)
                  }
                  key={`Town: ${i}`}
                >
                  <HouseCard
                    src={`houses/${e.images[0]}`}
                    price={e.price}
                    address={e.address}
                    size={220}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={style.list}>
            <div className={style.title}>Detached house</div>
            <div className={style.cards}>
              {data.sale.slice(9, 12).map((e, i) => (
                <div
                  className={style.card}
                  onClick={() =>
                    router.push(`/sale/${e.name.replaceAll(" ", "-")}`)
                  }
                  key={`Detached: ${i}`}
                >
                  <HouseCard
                    src={`houses/${e.images[0]}`}
                    price={e.price}
                    address={e.address}
                    size={220}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={style.list}>
            <div className={style.title}>etc.</div>
            <div className={style.cards}>
              {data.sale.slice(12, 15).map((e, i) => (
                <div
                  className={style.card}
                  onClick={() =>
                    router.push(`/sale/${e.name.replaceAll(" ", "-")}`)
                  }
                  key={`Efficiency: ${i}`}
                >
                  <HouseCard
                    src={`houses/${e.images[0]}`}
                    price={e.price}
                    address={e.address}
                    size={220}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
