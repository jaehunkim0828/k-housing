/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import data from "@/data.json";
import HouseIntro from "@/components/house-intro/houseIntro";
import style from "@/styles/sale.module.scss";
import Cat from "@/public/images/cat.png";
import Dog from "@/public/images/dog.png";
import Car from "@/public/images/car.png";
import Walk from "@/public/images/walk.png";
import Bcle from "@/public/images/bicycle.png";
import Cart from "@/public/images/cart.png";
import Sub from "@/public/images/sub.png";
import Image from "next/image";
import { config } from "@/config";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

enum Animal {
  NONE = "NONE",
  DOG = "DOG",
  CAT = "CAT",
  ALL = "ALL",
}

export default function RentPage() {
  const pathname = usePathname();

  const type = pathname.split("/")[1];
  const name = pathname.split("/")[2].replaceAll("-", " ");

  const info = (data as any)[type].filter((d: any) => d.name === name)[0];
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

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);

  const getAnimal = (animal: Animal) => {
    switch (animal) {
      case Animal.NONE:
        return <></>;
      case Animal.DOG:
        return (
          <div className={style.welcome}>
            <div className={style.animal}>
              <Image src={Dog} alt="dog" width={25} height={25} />
              <div>Dogs Welcome</div>
            </div>
          </div>
        );
      case Animal.CAT:
        return (
          <div className={style.welcome}>
            <div className={style.animal}>
              <Image src={Cat} alt="dog" width={25} height={25} />
              <div>Cats Welcome</div>
            </div>
          </div>
        );
      case Animal.ALL:
        return (
          <div className={style.welcome}>
            <div className={style.animal}>
              <Image src={Dog} alt="dog" width={25} height={25} />
              <div>Dogs Welcome</div>
            </div>
            <div className={style.animal}>
              <Image src={Cat} alt="dog" width={25} height={25} />
              <div>Cats Welcome</div>
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };

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
        images={[
          "images/primium-sample.png",
          "images/primium-sample.png",
          "images/primium-sample.png",
        ]}
        title={info.name}
      />
      <div className={style.form}>
        <div className={style.wrapper}>{getAnimal(info.animal_welcome)}</div>
      </div>
      <div className={style.form}>
        <div className={style.wrapper}>
          <div className={style.tbody}>
            <h1>Amenities</h1>
            <div className={style.tr}>
              <div className={style.td}>
                <div>In-unit Amenities</div>
              </div>
              <ul className={style.td2}>
                {info.in_unity_amenity.map((e: any, i: number) => (
                  <li key={`unity: ${i}`}>{e}</li>
                ))}
              </ul>
            </div>
            <div className={style.tr}>
              <div className={style.td}>
                <div>Community Amenities</div>
              </div>
              <ul className={style.td2}>
                {info.community_amenity.map((e: any, i: number) => (
                  <li key={`unity: ${i}`}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={style.form}>
        <div className={style.wrapper}>
          <div className={style.tbody}>
            <h1>{`Around this housing- ${info.local}`}</h1>
            <h5>{`K-Housing > ${info.local}`}</h5>
            <div className={style.transportation}>
              <div className={style.score}>
                <strong>Transportation in Playa Vista</strong>
                <div className={style.list}>
                  <div className={style.trans}>
                    <Image src={Walk} width={30} height={30} alt="walk" />
                    <div className={style.point}>
                      <span
                        style={{
                          color: info.bicycle > 50 ? "#003EDE" : "#D40000",
                          fontSize: "14px",
                        }}
                      >
                        {info.walk}
                      </span>
                      /100
                    </div>
                    <div>Very Walkable Walk Score®</div>
                  </div>
                  <div className={style.trans}>
                    <Image src={Bcle} width={30} height={30} alt="walk" />
                    <div className={style.point}>
                      <span
                        style={{
                          color: info.bicycle > 50 ? "#003EDE" : "#D40000",
                          fontSize: "14px",
                        }}
                      >
                        {info.bicycle}
                      </span>
                      /100
                    </div>
                    <div>Very Bikeable Bike Score®</div>
                  </div>
                </div>
              </div>
              <div className={style.rest}>
                <div className={style.card}>
                  <Image src={Cart} width={20} height={20} alt="cart" />
                  <div className={style.info}>
                    <strong>Places</strong>
                    <span>9 groceries, 49 restaurants, 13 parks</span>
                  </div>
                </div>
                <div className={style.card}>
                  <Image src={Sub} width={20} height={20} alt="cart" />
                  <div className={style.info}>
                    <strong>Places</strong>
                    <span>108, 110, 14, 3, CC 2, CC 4, CC 7, R3</span>
                  </div>
                </div>
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
          <div className={style.mapBar}>
            <div className={style.img}>
              <Image src={Car} alt="car" width={15} height={15} />
            </div>
            <div className={style.detail}>
              <div>- min</div>
              <div>Add a commute</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
