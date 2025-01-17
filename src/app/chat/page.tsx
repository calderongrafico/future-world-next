import { Chat } from "app/components/chat/";
import { getProducts } from "app/services/shopify/products";
import { createAgent } from "app/utils/openai/createAgent";

export default async function ChatPage() {

  const products = await getProducts();
  const productTitles = products.map((product) => product.title).join("\n");
  const agent = createAgent(productTitles);

  return (
    <>
      <h1>ChatBot</h1>
      <Chat agent={agent} />
    </>
  );
}
