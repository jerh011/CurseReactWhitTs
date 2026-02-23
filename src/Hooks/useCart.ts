import { useState, useEffect,useMemo } from "react";
import type { GuitarDto } from "../lib/Model/GuitarrDto";
import type { GuitarModel } from "../lib/Model/GuitarModel";
import{ db} from "../lib/db"

export default function useCart() {
  const initialCart = (): GuitarDto[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  //simulacion de la base de datos de guitarras
  const [data] = useState(db);
  //agregar aun carrito de compras
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  function removeFromCart(id:number) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }
  function incrementarQuantity(id:GuitarModel['id']) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }
  //reto 1
  function decrementarQuantity(id: GuitarModel["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  // console.log(cart)
  function addToCart(items: GuitarModel) {
    const itemExiste = cart.findIndex((guitar) => guitar.id === items.id);
    // console.log(itemExiste)
    if (itemExiste >= 0) {
      if (cart[itemExiste].quantity >= MAX_ITEMS) return; //ya existe en el carrito
      const updateCart = [...cart];
      updateCart[itemExiste].quantity++;
      setCart(updateCart);
    } else {
      const newItem: GuitarDto = { ...items, quantity: 1 };
    
      setCart([...cart, newItem]);
    }
  }
  function clearCart() {
    setCart([]);
  }
  // const isEmpty = useMemo(() => cart.leng === 0)[cart];
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart],
  );
  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decrementarQuantity,
    incrementarQuantity,
    clearCart,
    isEmpty,
    cartTotal
}
}
