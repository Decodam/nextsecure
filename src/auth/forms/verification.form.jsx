'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"



export default function VerifyOTPForm({borderless, className}) {
  const storedToken = localStorage.getItem('otpToken');
  const resetTime = 60

  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(resetTime); // 1 minute countdown
  const [loading, setLoading] = useState(false);


  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get('next');
  

  useEffect(() => {
    if(!storedToken){
      router.push("/login")
    }
  }, [router, storedToken])


  useEffect(() => {
    if (timeLeft === 0) return;

    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);



  function resetForm() {
    setError('');
    localStorage.removeItem('otpToken');
    setLoading(false);
  }


  const handleResendOTP = async(e) => {
    e.preventDefault()
    setLoading(true);


    localStorage.setItem('otpToken', 'dummyToken2');
    alert("OTP Resent");
    setTimeLeft(resetTime)


    setLoading(false);
    
  }





  const handleOTPVerification = async (e) => {
    e.preventDefault();
    
    setLoading(true);
  
    const formData = new FormData(e.target);
    const otp = formData.get('otp'); 
    const storedToken = localStorage.getItem('otpToken');

    if (storedToken && otp) {
      console.log('OTP:', otp);
      router.push('/')
    }
  
    setTimeout(() => {
      resetForm();
    }, 1000);
  };

  


  return (
    <Card className={`w-full max-w-md ${borderless && "border-none shadow-none bg-background" }  max-md:border-none  max-md:shadow-none  max-md:bg-background mx-auto ${className && className}`}>
        <CardHeader className="space-y-1">
          <Link href={"/"} className='mx-auto mb-4 mt-2'>
            <Image height={60} width={60} src="/icon.png" alt="alt" /> 
          </Link>
          <CardTitle className="text-2xl font-bold text-center">
            Verifiy OTP
          </CardTitle>
          <CardDescription className="text-center">
            An OTP has been sent to your email address. Please verify to login. (Please check spam folder if email is not recived)
          </CardDescription>
        </CardHeader>
        

        <CardContent className="space-y-4">
          <form className='space-y-2' onSubmit={handleOTPVerification}>
            {error && <p className='text-xs text-destructive dark:text-red-500 text-center'>{error}</p>}
            <div className="space-y-1 flex justify-center items-center">
              <InputOTP name="otp" maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div>
              <Button disabled={loading} type="submit" size="lg" className="w-full mt-4">
                {loading ? "Processing..." : "Verify OTP"}
              </Button>
            </div>
          </form>

          <div className="text-center text-sm">
            {timeLeft > 0 ? (
              <p>Resend OTP in {timeLeft} seconds</p>
            ) : (
              <p>
                Didn&apos;t recive OTP? 
                <button onClick={handleResendOTP} className="mx-1 underline text-primary">
                  Resend OTP
                </button>
              </p>
            )}
          </div>
          <span className="flex items-center">
            <span className="h-px flex-1 bg-border"></span>
            <span className="shrink-0 text-muted-foreground text-xs px-6">Or</span>
            <span className="h-px flex-1 bg-border"></span>
          </span>
          <div className="text-center text-sm">
            <p>
              Wrong Email Address? 
              <button onClick={() => {
                resetForm();
                router.push("/login")
              }} className="mx-1 underline text-primary">
                Change Here
              </button>
            </p>
          </div>

        </CardContent>

        <CardFooter>
          <p className="text-xs text-center text-muted-foreground w-full">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
    </Card>
  )
}
