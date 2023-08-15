import style from "./houseCard.module.scss";
import Image from "next/image";

export default function HouseCard({
  src,
  price,
  address,
  size,
}: {
  src: any;
  price: string;
  address: string;
  size?: number;
}) {
  return (
    <div
      className={style.houseCard}
      style={{
        backgroundImage: `url("${src}")`,
        width: size ? `${size}px` : "100%",
        height: size ? `${size}px` : "100%",
        backgroundSize: `auto 100%`,
        backgroundPositionX: "center",
        backgroundPositionY: "center",
      }}
    >
      <div className={style.context}>
        <strong className={style.price}>{price}</strong>
        <span className={style.address}>{address}</span>
      </div>
    </div>
  );
}
