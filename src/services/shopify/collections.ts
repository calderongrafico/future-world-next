import { env } from "app/config/env";
import { shopifyUrls } from "app/services/shopify/urls";

export const getCollections = async () => {
  try {
    const response = await fetch(shopifyUrls.collections.all, {
      headers: {
        "X-Shopify-Access-Token": env.SHOPIFY_TOKEN,
      },
    });

    const { smart_collections } = await response.json();

    const simplifiedCollections = smart_collections.map((collection: any) => {
      return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
      };
    });

    return simplifiedCollections;
  } catch (error) {
    console.log({ error });
  }
};

export const getCollectionProducts = async (id: number) => {
  try {
    const response = await fetch(shopifyUrls.collections.products(id), {
      headers: {
        "X-Shopify-Access-Token": env.SHOPIFY_TOKEN,
      },
    });

    const { products } = await response.json();

    return products;
  } catch (error) {
    console.log({ error });
  }
};
