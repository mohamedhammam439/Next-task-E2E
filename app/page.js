import ProductList from "./components/productList";

async function getProductsList() {
  const res = await fetch("http://localhost:8000/products", {
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
