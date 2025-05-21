import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia"

});
type ApiVersion = "2025-01-27.acacia" | "2025-02-24.acacia";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount } = req.body;
    
    if (!amount || typeof amount !== 'number' || amount < 50) {
      return res.status(400).json({ 
        error: 'Invalid amount. Minimum payment is $0.50' 
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { integration_check: 'accept_a_payment' }
    });

    return res.status(200).json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (err) {
    const error = err as Stripe.errors.StripeError;
    return res.status(500).json({ 
      error: error.message || 'Payment processing failed',
      code: error.code
    });
  }
}