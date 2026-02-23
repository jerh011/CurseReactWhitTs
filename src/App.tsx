import Header from "./components/Header";
import Footer from "./components/Footer"
import Guitarra from "./components/Guitarra";
import useCart from "./Hooks/useCart";
// import type { GuiatarModel } from "./lib/Model/GuitarModel";
function App() {
  //VERIFICA SI HAY ALGO EN LOCAL STORAGE
  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    decrementarQuantity,
    incrementarQuantity,
    clearCart,
    isEmpty,
    cartTotal
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementarQuantity={incrementarQuantity}
        decrementarQuantity={decrementarQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((Guitar) => (
            <Guitarra
              key={Guitar.id}
              guitar={Guitar}
              // setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
