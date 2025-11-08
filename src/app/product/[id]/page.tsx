'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

export default function PDP() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch('/api/printful-sync').then(r => r.json()).then(data => {
      setProduct(data.products.find((p: any) => p.id === Number(id)));
    });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...product, size, quantity: qty });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (!product) return <p className="text-center pt-20 text-blue-400">Loading product...</p>;

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <Image src={product.image} alt={product.name} width={500} height={500} className="rounded-xl" />
        <div>
          <h1 className="text-4xl font-orbitron text-red-500 mb-4">{product.name}</h1>
          <p className="text-3xl text-green-400 mb-6">${product.price}</p>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {['S','M','L','XL','2XL'].map(s => (
              <button key={s} onClick={() = setSize(s)} className={`tile text-center ${size===s?'border-red-500':''}`}>{s}</button>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setQty(Math.max(1,qty-1))}><Minus /></button>
            <span className="w-12 text-center text-xl">{qty}</span>
            <button onClick={() => setQty(qty+1)}><Plus /></button>
          </div>
          <button onClick={addToCart} className="btn-red w-full py-4 text-xl flex items-center justify-center gap-2">
            <ShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
