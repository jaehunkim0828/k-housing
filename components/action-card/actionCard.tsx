import Image from "next/image";

import style from "./actionCard.module.scss";
import { useRouter } from "next/navigation";

export default function ActionCard({
  src,
  title,
  desc,
  btn,
  path,
}: { [key in string]: any }) {
  const router = useRouter();
  const onRouter = (page: string) => {
    router.push(page);
  };
  return (
    <div onClick={() => onRouter(path)} className={style.actionContainer}>
      <div className={style.actionImage}>
        <Image src={src} layout="responsive" alt="action-card" />
      </div>
      <h2>{title}</h2>
      <span>{desc}</span>
      <button>{btn}</button>
    </div>
  );
}
