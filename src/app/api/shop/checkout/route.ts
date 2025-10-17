import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const productId = body.productId

  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  if (!product || product.stock < 1) {
    return NextResponse.json({ error: 'Product not found or out of stock' })
  }

  const code = await prisma.productCode.findFirst({
    where: { productId, used: false },
  })

  if (!code) {
    return NextResponse.json({ error: 'No unused code available' })
  }

  await prisma.productCode.update({
    where: { id: code.id },
    data: { used: true },
  })

  await prisma.product.update({
    where: { id: productId },
    data: { stock: product.stock - 1 },
  })

  await prisma.order.create({
  data: {
    userId: body.userId,
    productId: productId,
    codeId: code.id,
  },
})


  return NextResponse.json({ code: code.code })
}
