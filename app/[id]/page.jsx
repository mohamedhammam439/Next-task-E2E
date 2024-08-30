async function getProductDetails(id) {
  const res = await fetch("https://json-server-e2-e.vercel.app/products/" + id, {
    next: { revalidate: 30*30 },
  });
  return res.json();
}

const ItemDetails = async ({ params }) => {
  const Item = await getProductDetails(params.id);
  return (
    <>
      <h1 className="font-bold text-xl mb-6">Item Details</h1>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4 text-center">
      <h1 className="font-bold text-xl mb-2">{Item.name}</h1>
      <h1 className="font-bold text-xl mb-2">{Item.price} EGP</h1>
      <p className="text-gray-700 text-base">{Item.description}</p>
      </div>
     
    </div>
    </>
  );
};

export default ItemDetails;
