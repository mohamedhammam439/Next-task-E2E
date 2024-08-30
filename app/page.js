import ProductList from "./components/productList";

async function getProductsList() {
  const res = await fetch("https://json-server-e2-e.vercel.app/products", {
    next: { revalidate: 30*30 },
  });
  return res.json();
}
export default async function Home() {
  const Products = await getProductsList();
  return (
    <>
      <ProductList Products={Products} />
    </>
  
  );
}
