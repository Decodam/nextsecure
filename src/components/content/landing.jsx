import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Book, Rocket, ChevronRight, Shield, Database, } from 'lucide-react';
import { SignedIn, SignedOut } from "@/auth/session";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from "@/auth/actions";

export default async function LandingPage() {

  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(117,248,124,0.5)] dark:bg-[rgba(117,248,124,0.2)] opacity-50 blur-[80px]"></div>
      </div>

      <nav className="mx-4 lg:mx-auto max-w-screen-lg h-16 flex justify-between items-center">
        <Link href="/">
          <Image src={"/icon.png"} width={40} height={40} alt="logo" />
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            {(user) => (
              <Avatar>
                <AvatarImage src={user?.image} />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
            )}
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2">
              <Button size="lg" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </nav>

      <div className="mx-4 lg:mx-auto max-w-screen-lg pt-16 pb-24 lg:pb-32">
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-x-2 transition border hover:bg-muted/40 text-sm p-1 ps-3 rounded-full"
            target="_blank"
            href="https://authjs.dev/getting-started/"
          >
            Powered by Auth.js V5 - Read Docs
            <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/15 font-semibold text-sm">
              <ChevronRight className="flex-shrink-0 w-4 h-4" />
            </span>
          </a>
        </div>

        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <span className="text-green-500">NextSecure</span> - Next.js Auth Starter Template
          </h1>
        </div>
        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-xl text-muted-foreground">
            Kickstart your next project with prebuilt authentication templates with Auth and Prisma Adapter, already set up for you!
          </p>
        </div>

        <div className="mt-8 gap-3 flex justify-center">
          <SignedIn>
            {(user) => (
              <form action={logout}>
                <Button size={"lg"}>
                  Logout
                </Button>
              </form>
            )}
          </SignedIn>
          <SignedOut>
            <Button size={"lg"} asChild>
              <Link href={"/login"}>Try Now</Link>
            </Button>
          </SignedOut>
          <Button size={"lg"} variant={"outline"} asChild>
            <Link href="https://www.prisma.io/docs/getting-started">
              Prisma Docs
            </Link>
          </Button>
        </div>

        <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
          <span className="text-sm text-muted-foreground">
            Components from:
          </span>
          <span className="text-sm font-bold">Shadcn-UI </span>
          <svg
            className="h-5 w-5 text-muted-foreground"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 13L10 3"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
          <a
            className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline font-medium"
            target="_blank"
            href="https://ui.shadcn.com/docs/installation/next"
          >
            Installation Guide
            <ChevronRight className="flex-shrink-0 w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="mx-4 md:mx-auto max-w-screen-md grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/10 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-green-500" />
              Prisma Docs
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Learn about Prisma ORM features and how to integrate it into your applications.
            </CardDescription>
          </CardHeader>
          <Button variant="ghost" className="ml-6 mb-4" asChild>
            <Link href="https://www.prisma.io/docs/getting-started" target="_blank" rel="noopener noreferrer">
              Explore Prisma
            </Link>
          </Button>
        </Card>

        <Card className="bg-card/10 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5 text-green-500" />
              Next.js Docs
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Master the React framework for production-grade applications.
            </CardDescription>
          </CardHeader>
          <Button variant="ghost" className="ml-6 mb-4" asChild>
            <Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
              Explore Next.js
            </Link>
          </Button>
        </Card>

        <Card className="bg-card/10 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-500" />
              Auth.js Docs
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Authentication for the Web. Free and open source.
            </CardDescription>
          </CardHeader>
          <Button variant="ghost" className="ml-6 mb-4" asChild>
            <Link href="https://authjs.dev/getting-started" target="_blank" rel="noopener noreferrer">
              Explore Auth
            </Link>
          </Button>
        </Card>

        <Card className="bg-card/10 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Rocket className="mr-2 h-5 w-5 text-green-500" />
              Starter Kit
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Get started with our comprehensive starter kit documentation.
            </CardDescription>
          </CardHeader>
          <Button variant="ghost" className="ml-6 mb-4" asChild>
            <Link href="https://paper-dryosaurus-158.notion.site/Mongobase-f383b725404249f8abe883f1d7d42fd7#ed9f05f96d7f460c91d2600387bd5142" target="_blank" rel="noopener noreferrer">
              Documentaion
            </Link>
          </Button>
        </Card>
      </div>

      <footer className="w-full mt-14">
        <div className="mx-4 lg:mx-auto max-w-screen-lg flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-xs leading-loose text-muted-foreground md:text-left">
              Built with <Heart className="inline-block h-4 w-4 text-red-500" /> by{" "}
              <Link
                href="https://github.com/Decodam"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                @Decodam
              </Link>
            </p>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <Link
              href="https://github.com/Decodam/nextsecure"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium underline underline-offset-4"
            >
              <GitHubLogoIcon className="h-4 w-4" />
              Project Repository
            </Link>
          </div>
          <p className="text-center text-xs text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Next Secure. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}