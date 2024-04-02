import { env } from "app/config/env";

export const shopifyUrls = {
  products: {
    all: `${env.SHOPIFY_HOSTNAME}/admin/api/2024-01/products.json`,
    mainProducts: `${env.SHOPIFY_HOSTNAME}/admin/api/2024-01/collections/416055722242/products.json`,
  },

  collections: {
    all: `${env.SHOPIFY_HOSTNAME}/admin/api/2024-01/smart_collections.json`,
    products: (id: number) => `${env.SHOPIFY_HOSTNAME}/admin/api/2024-01/collections/${id}/products.json`,
  },
};
