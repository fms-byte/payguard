// app/page.tsx
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Shield, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70"></div>
        <div className="container relative flex flex-col items-center justify-center space-y-12 py-24 text-center lg:py-32">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Secure Payment Management
              <span className="text-primary"> Made Simple</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Track, verify, and manage payments with enterprise-grade security. Perfect for businesses of all sizes.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/auth/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-transparent relative">
        <div className="absolute inset-0 bg-transparent "></div>
        <div className="container relative py-20">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            Why Choose PayGuard?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background/80 backdrop-blur-sm p-6 text-center">
              <Shield className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with advanced encryption and fraud protection.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background/80 backdrop-blur-sm p-6 text-center">
              <CreditCard className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Easy Payment Tracking</h3>
              <p className="text-muted-foreground">
                Real-time payment tracking and status updates at your fingertips.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background/80 backdrop-blur-sm p-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Instant Verification</h3>
              <p className="text-muted-foreground">
                Quick and efficient document verification process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t text-primary-foreground py-10">
        <div className="container p-20 text-center bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 rounded-xl relative overflow-hidden">
          <div className="relative">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of businesses already using PayGuard
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/auth/signup">
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}