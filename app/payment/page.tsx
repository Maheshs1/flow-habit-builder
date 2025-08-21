'use client'

import BenefitsSection from '@/components/landing/BenefitsSection';
import CTASection from '@/components/landing/CTASection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import Script from 'next/script';
import React, { useState } from 'react'

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentProcessing = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-order', { method: 'POST' });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 100,
        currency: 'INR',
        name: 'Floww',
        description: 'Test Transaction',
        order_id: data.orderId,
        handler: function (response: any) {
          redirect('/identity')
        }
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Script src='https://checkout.razorpay.com/v1/checkout.js' />
      <HeroSection handlePaymentProcessing={handlePaymentProcessing} />
      <ProblemSection />
      <FeaturesSection />
      <BenefitsSection handlePaymentProcessing={handlePaymentProcessing} />
      <TestimonialsSection />
      <CTASection handlePaymentProcessing={handlePaymentProcessing} />
      <Footer />
    </div>
  )
}

export default Payment