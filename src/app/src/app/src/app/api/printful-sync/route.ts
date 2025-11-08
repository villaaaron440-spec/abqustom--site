import { NextResponse } from 'next/server';
import axios from 'axios';

const TOKEN = '7rjR4HZcqBoQhCgy2cqDdhkdn62Pb4IriNkBEYbA';

export async function GET() {
  try {
    const productsRes = await axios.get('https://api.printful.com/products', { headers: { Authorization: `Bearer ${TOKEN}` } });
    const products = productsRes.data.result.slice(0, 12);

    const synced = products.map((p: any) => ({
      id: p.id,
      name: p.name.split('(')[0].trim(),
      category: p.name.toLowerCase().includes('hoodie') ? 'hoods' : p.name.toLowerCase().includes('hat') ? 'hats' : p.name.toLowerCase().includes('mug') ? 'mugs' : 'tshirts',
      price: Math.round((p.variants[0].retail_price * 1.45) * 100) / 100,
      image: `https://files.printful.com/default/mocks/${p.variants[0].product_id}-front.png`,
    }));

    return NextResponse.json({ products: synced });
  } catch (e) {
    return NextResponse.json({ products: [] });
  }
}
