import { NextResponse } from 'next/server'

export async function GET() {
  const orders = [
    {
      id: '1',
      product: 'iTunes Card',
      user: 'Ahmed',
      code: 'ABC123',
    },
    {
      id: '2',
      product: 'Google Play Card',
      user: 'Sara',
      code: 'XYZ789',
    },
  ]

  return NextResponse.json(orders)
}
