'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Upload } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('tshirts');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/printful-sync')
      .then(r => r.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const categories = [
    { id: 'tshirts', name: 'T-Shirts' },
    { id: 'hoods', name: 'Hoods' },
    { id: 'hats', name: 'Hats' },
    { id: 'mugs', name: 'Mugs' },
  ];

  const filtered = products.filter(p => p.category?.toLowerCase().includes(activeCategory));

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b-2 border-blue-500 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-4xl font-orbitron text-red-500">ABQUSTOM</Link>
          <div className="flex gap-6">
            <Link href="/upload" className="tile flex items-center gap-2"><Upload size={20} /> Upload</Link>
            <Link href="/cart" className="tile relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-6 h-6 flex items-center justify-center">{cart.length}</span>}
            </Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <div>
          <h1 className="text-7xl font-orbitron mb-6">
            <span className="text-blue-400">ABQ</span><span className="text-white">UST</span><span className="text-red-500">OM</span>
          </h1>
          <p className="text-2xl mb-8">Your Design. American Made. On Demand.</p>
          <Link href="/upload" className="btn-red text-xl px-8 py-4">Start Customizing</Link>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`tile text-center ${activeCategory === cat.id ? 'border-red-500' : ''}`}>
                <h3 className="text-3xl font-bold">{cat.name}</h3>
              </button>
            ))}
          </div>

          {loading ? <p className="text-center text-blue-400">Syncing Printful...</p> : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filtered.map(p => (
                <Link key={p.id} href={`/product/${p.id}`} className="tile">
                  <Image src={p.image} alt={p.name} width={200} height={200} className="w-full h-48 object-cover rounded mb-2" />
                  <h4 className="font-bold">{p.name}</h4>
                  <p className="text-green-400">${p.price}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
     }
