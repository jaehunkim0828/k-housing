/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/config";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import style from "@/styles/house.module.scss";
import Select from "@/components/select/Select";
import { useRecoilValue } from "recoil";
import { buyType } from "@/state/buy";
import Drop from "@/public/svg/drop";
import House from "@/public/images/House.png";
import Apartment from "@/public/images/Apartment.png";
import Townhouse from "@/public/images/Townhouse.png";
import Condo from "@/public/images/Condo.png";
import Resort from "@/public/images/Resort.png";
import Hotel from "@/public/images/Hotel.png";
import Land from "@/public/images/Land.png";
import Building from "@/public/images/Building.png";
import Others from "@/public/images/Others.png";
import Image from "next/image";
import data from "@/data.json";
import HouseCard from "@/components/house-card/houseCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Search from "@/public/svg/search";

const selectionList = [
  { title: "For sales", items: ["for sales", "for rents"] },
  { title: "Timing of sales", items: ["pre-sales", "post-sales"] },
];

const homeType = [
  { desc: "House", img: House },
  { desc: "Apartment", img: Apartment },
  { desc: "Townhouse", img: Townhouse },
  { desc: "Condo", img: Condo },
  { desc: "Resort", img: Resort },
  { desc: "Hotel", img: Hotel },
  { desc: "Land", img: Land },
  { desc: "Building", img: Building },
  { desc: "Others", img: Others },
];

export default function BuyPage() {
  const search = useSearchParams();
  const [_, setMap] = useState<google.maps.Map | null>(null);
  const router = useRouter();
  const mapKey = config.google_map;
  const buyState = useRecoilValue(buyType);
  const having = ["incheon", "seoul", "gyeonggi-do", "busan", "jeju"];
  const [local, setLocal] = useState(search.get("local"));
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapKey,
  });
  const [currentD, setCurrentD] = useState("");
  const [house, setHouses] = useState(
    buyState === "sale" ? data["sale"] : data["rent"]
  );
  const [sh, setSh] = useState("");
  const localRef = useRef<any>();

  const [selection, setSelection] = useState<{ [key in string]: string }>({
    "For sales": buyState === "sale" ? "for sales" : "for rents",
    "Timing of sales": "",
    "Home type": "",
  });

  const [areas, SetArea] = useState<string[]>([]);

  const center = {
    lat: 37.5522,
    lng: 126.92,
  };

  const setSelectList = (type: string, item: string) => {
    setSelection((prev: any) => {
      return { ...prev, [type]: item };
    });
  };

  const onLoad = useCallback((map: any) => {
    let picks: any = [];
    if (having.includes(localRef.current?.toLowerCase() ?? "")) {
      house.forEach(g => {
        if ("home_fact" in g) {
          if (
            g.home_fact.local.toLowerCase() === localRef.current?.toLowerCase()
          )
            picks.push(g);
        } else {
          if (g.local.toLowerCase() === local) picks.push(g);
        }
      });
    } else {
      picks = house;
    }
    const bounds = new window.google.maps.LatLngBounds(center);
    picks.forEach((location: any) => {
      bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
    });
    map.fitBounds(bounds);
    setMap(map);
    setHouses(picks);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    localRef.current = search.get("local");
    return () => {
      onUnmount();
    };
  }, []);

  useEffect(() => {
    setLocal(search.get("local"));
  }, [search.get("local")]);

  useEffect(() => {
    setSelection(prev => ({
      ...prev,
      "For sales": buyState === "sale" ? "for sales" : "for rents",
    }));
    setHouses(buyState === "sale" ? data["sale"] : data["rent"]);
  }, [buyState]);

  return (
    <main className={style.houseContainer}>
      <div className={style.local}>
        <div className={style.search}>
          <input
            placeholder="search"
            value={sh}
            onChange={e => setSh(e.target.value)}
          />
          <button
            onClick={() => {
              router.push(`/houses?local=${sh}`);
              localRef.current = sh;
            }}
          >
            <Search />
          </button>
        </div>
        <div>
          {having.includes(local?.toLowerCase() ?? "")
            ? local?.toUpperCase()
            : "ALL"}
        </div>
      </div>
      <div className={style.main}>
        {isLoaded ? (
          <GoogleMap
            key={local}
            mapContainerClassName={style.googleMap}
            onLoad={map => onLoad(map)}
            zoom={10}
            options={{ minZoom: 4, maxZoom: 20 }}
            onUnmount={onUnmount}
          >
            {house.map((location, i) => (
              <Marker
                position={location}
                key={`map index: ${i}`}
                onClick={() =>
                  router.push(
                    `/${
                      buyState === "sale" ? "sale" : "rent"
                    }/${location.name.replaceAll(" ", "-")}`
                  )
                }
              />
            ))}
          </GoogleMap>
        ) : (
          <div className={style.googleMap}>로딩중...</div>
        )}
        <div className={style.filter}>
          <div className={style.area}>
            <h2>
              {!!areas.length
                ? areas.reduce((a: string, b: string) => `${a}, ${b} `)
                : "Korea "}
              for sales
            </h2>
            <div className={style.detail}>
              <span>Market insightst</span>
              <span className={style.center}></span>
              <span>City guide</span>
            </div>
          </div>
          <div className={style.dropDowns}>
            {selectionList.map((s, i) => (
              <Select
                key={`selection: ${i}`}
                title={s.title}
                items={s.items}
                selection={selection[s.title]}
                setSelectList={setSelectList}
                current={currentD}
                setCurrent={setCurrentD}
              />
            ))}
            <div
              onFocus={() =>
                currentD === "Home type"
                  ? setCurrentD("")
                  : setCurrentD("Home type")
              }
              onBlur={() => setCurrentD("")}
              className={style.selectContainer}
              tabIndex={0}
            >
              <div className={style.title}>
                Home type <Drop />
              </div>
              {currentD === "Home type" && (
                <div className={style.container}>
                  <div className={style.list}>
                    {homeType.map((t, i) => (
                      <div key={`home type list: ${i}`} className={style.type}>
                        <div className={style.img}>
                          <Image src={t.img} alt={t.desc} layout="responsive" />
                        </div>
                        <div className={style.desc}>{t.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className={style.btns}>
                    <button>Reset</button>
                    <button>Done</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* 70 of 500 homes */}
          <div className={style.houses}>
            {house.map((h, i) => (
              <div
                onClick={() => {
                  router.push(`${buyState}/${h.name.replaceAll(" ", "-")}`);
                }}
                className={style.house}
                key={`houses: ${i}`}
              >
                <HouseCard
                  src={`/houses/${h.images?.[0]}`}
                  address={h.address}
                  price={
                    typeof h.price === "number"
                      ? h.price
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                      : h.price
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
