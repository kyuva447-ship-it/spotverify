import { NextResponse } from 'next/server';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    if (!validateWebhookSignature(bodyText, signature, secret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    if (event.event === 'order.paid') {
      const orderId = event.payload.order.entity.id;

      await supabaseAdmin
        .from('tasks')
        .update({ status: 'funded' })
        .eq('razorpay_order_id', orderId);
    }

    return NextResponse.json({ status: 'success' });
  } catch (err) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}