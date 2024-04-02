interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

type ProductType = {
  description: string;
  handle: string;
  id: string;
  image: string;
  price: number;
  quantity: number;
  tags: string;
  title: string;
};
