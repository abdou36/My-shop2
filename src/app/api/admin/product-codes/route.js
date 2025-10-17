import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// 👇 إنشاء Supabase Client باستخدام متغيرات البيئة
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
)

export async function GET() {
  // 👇 جلب البيانات من جدول ProductCode مع اسم المنتج المرتبط
  const { data, error } = await supabase
    .from('ProductCode')
    .select('id, code, product(name)')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
