import { Metadata } from "next";
import { MainProducts } from "app/components/home/MainProducts";

export const metadata: Metadata = {
  title: "Future World",
  description: "Welcome to the Future World, an ecommerce from other century.",
};

export default function Home() {
  return (
    <main>
      <MainProducts />
    </main>
  );
}
