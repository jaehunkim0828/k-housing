"use client";
import { RecoilRoot } from "recoil";

export default function Recoil({ children }: any) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
