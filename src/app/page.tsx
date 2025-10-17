'use client'

import { useEffect, useState } from 'react'

// 👇 تعريف نوع المنتج
type Product = {
  id: string
  name: string
  description: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // 👇 جلب المنتجات من API وهمي للتجربة
    fetch('/api/products') // غيّر هذا لاحقًا لـ Supabase إذا أردت
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">قائمة المنتجات</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 bg-white shadow hover:shadow-md transition">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-slate-600">{product.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
