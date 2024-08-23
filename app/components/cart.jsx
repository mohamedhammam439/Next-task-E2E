const Cart = ({ cart }) => {
  const totalPrice = cart.reduce((acc, curr) => acc + parseFloat(curr.price), 0)
  return (
    <>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center my-3">
          <h2 className="text-base sm:text-xl font-bold mb-2">Shopping Cart</h2>
          {cart.length > 0 ? <h2 className="text-base  mb-2">you have {cart.length} Items in Cart</h2> : ''}

        </div>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <div className="flex flex-row w-full rounded overflow-hidden shadow-lg p-4 justify-between my-3">
                    <h3>{item.name}</h3>
                    <h3>{item.price} EGP</h3>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t-2 mt-4 pt-4 flex flex-row justify-between">
              <h3 className="text-base sm:text-xl font-bold mb-2">Total</h3>
              <h3 className="text-base sm:text-xl font-bold mb-2">{totalPrice}EGP</h3>
            </div>
          
          </>
        ) : (
          <p>there is no items in cart</p>
        )}
      </div>
    </>
  );
};

export default Cart;
