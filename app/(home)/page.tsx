import delay from "@/lib/delay";
import { Metadata } from "next";
import VPageHome from "./_components/v-page";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};
export default async function Home() {
  await delay(1000);

  return <VPageHome />;
}
