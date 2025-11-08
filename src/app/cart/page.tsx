'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-orbitron text-red-500 mb-8">Your Cart</h1>
        {cart.length === 0 ? <p className="text-center">Cart empty</p> : cart.map((item, i) => (
          <div key={i} className="tile flex gap-4 mb-4 p-4">
            <Image src={item.image} alt="" width={100} height={100} className="rounded" />
            <div className="flex-1">
              <h3>{item.name} - {item.size}</h3>
              <p>Qty: {item.quantity}</p>
            </div>
            <p className="text-green-400">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <p className="text-3xl text-right mt-8">Total: ${total.toFixed(2)}</p>
        <button className="btn-red w-full mt-4 py-4">Checkout with Printful</button>
      </div>
    </div>
  );
}
