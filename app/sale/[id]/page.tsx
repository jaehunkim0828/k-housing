/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import data from "@/data.json";
import HouseIntro from "@/components/house-intro/houseIntro";
import style from "@/styles/sale.module.scss";
import { config } from "@/config";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function SalePage() {
  const pathname = usePathname();
  const [_, setMap] = useState<google.maps.Map | null>(null);
  const house = { lat: 37.551169, lng: 126.986037, place: "남산서울타워" };
  const mapKey = config.google_map;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapKey,
  });

  const onLoad = useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds(house);
    bounds.extend(new window.google.maps.LatLng(house.lat, house.lng));
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const type = pathname.split("/")[1];
  const name = pathname.split("/")[2].replaceAll("-", " ");

  const info = (data as any)[type].filter((d: any) => d.name === name)[0];

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);

  return (
    <main>
      <HouseIntro
        address={info.address}
        bath={info.bad_count}
        toliet={info.toilet_count}
        acreage={info.acreage}
        home_detail={info.home_detail}
        price={
          typeof info.price === "string"
            ? info.price
            : "₩" +
              info.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        }
        images={info.images}
        title={info.name}
      />
      <div className={style.form}>
        <div className={style.wrapper}>
          <div className={style.tbody}>
            <h1>Home facts</h1>
            <div className={style.tr}>
              <div className={style.td}>
                <div>Time on K-housing</div>
                <div>{info.home_fact.time_on}</div>
              </div>
              <div className={style.td}>
                <div>Community</div>
                <div>{info.home_fact.local}</div>
              </div>
            </div>
            <div className={style.tr}>
              <div className={style.td}>
                <div>Property Type</div>
                <div>{info.home_fact.prototype}</div>
              </div>
              <div className={style.td}>
                <div>Lot Size</div>
                <div>{info.home_fact.lot_size}</div>
              </div>
            </div>
            <div className={style.tr}>
              <div className={style.td}>
                <div>Year Built</div>
                <div>{info.home_fact.year_built}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.form}>
        <div className={style.wrapper}>
          <div className={style.tbody}>
            <h1>Price insights</h1>
            <div className={style.tr}>
              <div className={style.td}>
                <div>List Price</div>
                <div>{info.price_insight.list_price}</div>
              </div>
              <div className={style.td}>
                <div>Price/Sq.Ft.</div>
                <div>{info.price_insight.price_per}</div>
              </div>
            </div>
            <div className={style.tr}>
              <div className={style.td}>
                <div>Est . Mo . Payment</div>
                <div>{info.price_insight.m_price}</div>
              </div>
              <div className={style.td}>
                <div>Buyer’s Agent Commisson</div>
                <div>{info.price_insight.agent_fee}</div>
              </div>
            </div>
            <div className={style.tr}>
              <div className={style.td}>
                <div>K-Houging Estimate</div>
                <div>{info.home_fact.estimate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.homePosition}>
        <div className={style.wrapper}>
          {isLoaded && (
            <GoogleMap
              mapContainerClassName={style.googleMap}
              onLoad={map => onLoad(map)}
              options={{ minZoom: 4, maxZoom: 20 }}
              zoom={15}
            >
              <Marker position={house} onClick={() => console.log(location)} />
            </GoogleMap>
          )}
        </div>
      </div>
    </main>
  );
}
