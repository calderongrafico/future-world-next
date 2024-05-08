"use client";

import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useShoppingCart } from "app/hooks/useShoppingCart";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { handleCreateCart } from "app/actions";
import styles from "./ShoppingCart.module.sass";

export default function ShoppingCart() {
  const { cart } = useShoppingCart();

  const [isOpen, setIsOpen] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const hasItems = cart.length > 0;
  const handleOpenCart = () => {
    if (hasItems) {
      setIsOpen(!isOpen);
    }
  };

  const handleBuy = async () => {
    try {
      setIsBuying(true);
      const checkoutUrl = await handleCreateCart(cart);
      if (!checkoutUrl) {
        throw new Error("Error creating cart");
      }
      window.localStorage.removeItem("cart");
      window.location.href = checkoutUrl;
    } catch (error) {
      console.log({ error });
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className={styles.ShoppingCart}>
      {hasItems && (
        <span className={styles.ShoppingCart__counter}>{cart.length}</span>
      )}
      <button className={styles.ShoppingCart__cart} onClick={handleOpenCart}>
        <FaShoppingCart />
      </button>
      {isOpen && hasItems && (
        <div className={styles.ShoppingCart__items}>
          {cart.map((item) => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
          <button
            className={styles.ShoppingCart__buyButton}
            disabled={isBuying}
            onClick={handleBuy}
          >
            Buy
          </button>
        </div>
      )}
    </div>
  );
}
