import { ProductView } from "app/components/product/ProductView";
import { getProducts } from "app/services/shopify/products";
import { redirect } from "next/navigation";
// import { useParams, useSearchParams } from "next/navigation";

interface ProductPageProps {
  searchParams: {
    id: string;
  };
}

export async function generateMetadata({ searchParams }: ProductPageProps) {
  const idParam = searchParams.id;
  const products = await getProducts(idParam);
  const product = products[0];

  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      images: [product.image], // imagen para compartir en redes sociales
    },
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  // const params = useParams();
  const idParam = searchParams.id;

  const products = await getProducts(idParam);
  const product = products[0];

  if (!idParam) {
    redirect("/store");
  }

  return <ProductView product={product} />;
}
