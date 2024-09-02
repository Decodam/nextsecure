'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { OAuthProviders } from '@/auth/utils';



export default function AuthForm({borderless, className}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams()
  const next = searchParams.get('next')
  const oauth_error = searchParams.get('error')
  

  useEffect(() => {
    if (oauth_error === "OAuthAccountNotLinked") {
      setError("This OAuth provider is not yet linked to your account! Please login with a connected provider to connect and use it.")
    }
  }, [oauth_error])



  function resetForm() {
    setEmail('');
    setError('');
    setLoading(false)
  }


  const handleEmailLogin = async(e) => {
    e.preventDefault()
    setLoading(true);


    alert("email");
    
      
    setTimeout(() => {
      resetForm()
    }, 1000);
  }



  const handleOauthLogin = async(provider) => {
   alert(provider);
  }


  return (
    <Card className={`w-full max-w-md ${borderless && "border-none shadow-none bg-background" }  max-md:border-none  max-md:shadow-none  max-md:bg-background mx-auto ${className && className}`}>
        <CardHeader className="space-y-1">
          <Link href={"/"} className='mx-auto mb-4 mt-2'>
            <Image height={60} width={60} src="/icon.png" alt="alt" /> 
          </Link>
          <CardTitle className="text-2xl font-bold text-center">Login to NextSecure</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(OAuthProviders && OAuthProviders.length > 0) && (
            <>
              <div className='space-y-2'>
                {OAuthProviders.map(({ provider, icon: Icon, key }) => (
                  <Button onClick={() => {handleOauthLogin(provider)}} variant="outline" className="w-full space-x-2" size="lg" key={key}>
                    <span><Icon /></span>
                    <span className='capitalize'>Continue with {provider}</span>
                  </Button>
                ))}
              </div>
              <span className="flex items-center">
                <span className="h-px flex-1 bg-border"></span>
                <span className="shrink-0 text-muted-foreground text-xs px-6">Or, Continue with Email</span>
                <span className="h-px flex-1 bg-border"></span>
              </span>
            </>
          )}

          <form className='space-y-2' onSubmit={handleEmailLogin}>
            {error && <p className='text-xs text-destructive dark:text-red-500 text-center'>{error}</p>}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div>
              <Button disabled={loading} type="submit" size="lg" className="w-full mt-4">
                {loading ? "Processing..." : "Login with Email"}
              </Button>
            </div>
          </form>

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