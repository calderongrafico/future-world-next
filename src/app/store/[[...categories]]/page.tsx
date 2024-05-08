import { ProductsWrapper } from "app/components/store/ProductsWrapper";
import {
  getCollectionProducts,
  getCollections,
} from "app/services/shopify/collections";
import { getProducts } from "app/services/shopify/products";

export const runtime = "edge";
interface CategoryProps {
  params: {
    categories: string[];
  };
  searchParams: {
    brand?: string;
  };
}

export default async function Category(props: CategoryProps) {
  // products data will be fetched at build time
  let products = [];
  // getting the categories from the URL when on a category page. If no categories are found, we are on the home page
  const { categories } = props.params;
  // getting the collections from the Shopify store
  const collections = await getCollections();

  // if we are on a category page, we are fetching the products from the current collection. If not, we are fetching all products
  if (categories?.length > 0) {
    // getting the current collection based on the first category in the URL
    const currentCollection = collections.find(
      (collection: any) => collection.handle === categories[0]
    );
    // getting the products from the current collection
    products = await getCollectionProducts(currentCollection.id);
  } else {
    // getting all products
    products = await getProducts();
  }

  // throw new Error("Error");

  return <ProductsWrapper products={products} />;
}
