'use client'

import { useEffect, useState } from 'react'

type Product = {
  id: string
  name: string
  description: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // جلب المنتجات من Supabase
    fetch('/api/products') // أو استخدم Supabase Client مباشرة
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">قائمة المنتجات</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-slate-600">{product.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
