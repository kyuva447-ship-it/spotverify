import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount, taskId } = await req.json();
    
    const COMMISSION_RATE = 0.015; 
    const totalAmountInPaise = Math.round(amount * 100);
    const platformFeeInPaise = Math.round(totalAmountInPaise * COMMISSION_RATE);
    const escrowPrincipalInPaise = totalAmountInPaise - platformFeeInPaise;

    const options = {
      amount: totalAmountInPaise,
      currency: 'INR',
      receipt: `rcpt_${taskId.substring(0, 8)}`,
      notes: { 
        taskId, 
        platformFee: platformFeeInPaise / 100, 
        escrowPrincipal: escrowPrincipalInPaise / 100 
      },
      transfers: [
        {
          account: process.env.RAZORPAY_BUSINESS_ACCOUNT_ID!, 
          amount: platformFeeInPaise,
          currency: 'INR',
          on_hold: false,
        },
        {
          account: process.env.RAZORPAY_ESCROW_ACCOUNT_ID!, 
          amount: escrowPrincipalInPaise,
          currency: 'INR',
          on_hold: true,
        }
      ],
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount,
      breakdown: {
        total: amount,
        yourCommission: platformFeeInPaise / 100,
        lockedEscrow: escrowPrincipalInPaise / 100
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Order generation failed' }, { status: 500 });
  }
}