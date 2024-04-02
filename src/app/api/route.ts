import { getCollections } from "app/services/shopify/collections";
import { getProducts } from "app/services/shopify/products";

/**
 * Ejemplo de API propia
 */
// // export async function GET() {
// //   const message = "Hello World";

// //   return Response.json({ message });
// // }

/**
 * Exponer una API propia con el response de productos de Shopify 
 * (ir a localhost:3000/api)
 */
// export async function GET() {
//   const products = await getProducts();

//   return Response.json({ products });
// }

export async function GET() {
  const collections = await getCollections();

  return Response.json({ collections });
}
