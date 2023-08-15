import { StaticImageData } from "next/image";
import Image from "next/image";

export default function NextImage({
  src,
  width,
  height,
}: {
  src: StaticImageData;
  width: string;
  height?: string;
}) {
  return (
    <div style={{ width: width, height }}>
      <Image src={src} layout="responsive" alt="image" />
    </div>
  );
}
