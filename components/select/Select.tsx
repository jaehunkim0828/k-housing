import { useEffect, useState } from "react";

import style from "./select.module.scss";
import Drop from "@/public/svg/drop";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { buyType } from "@/state/buy";

export default function Select({
  title,
  items,
  selection,
  setSelectList,
  current,
  setCurrent,
}: {
  title: string;
  items: string[];
  selection: string;
  setSelectList: (type: string, item: string) => void;
  current: string;
  setCurrent: any;
}) {
  const [type, setType] = useState(selection);
  const router = useRouter();
  const [buy, setBuy] = useRecoilState(buyType);

  return (
    <div
      className={style.selectContainer}
      tabIndex={0}
      onFocus={() => (current === title ? setCurrent("") : setCurrent(title))}
      onBlur={() => setCurrent("")}
    >
      <div className={style.title}>
        {title} <Drop />
      </div>
      {current === title && (
        <div className={style.list}>
          {items.map((item, i) => (
            <div className={style.item} onClick={() => setType(item)} key={i}>
              <div
                className={style.checked}
                style={{ borderColor: type === item ? "#003ede" : "grey" }}
              ></div>
              <div>{item}</div>
            </div>
          ))}
          <div
            className={style.btn}
            onClick={() => {
              if (type === "for rents") {
                setBuy("rent");
              } else if (type === "for sales") {
                setBuy("sale");
              }
            }}
          >
            Apply
          </div>
        </div>
      )}
    </div>
  );
}
