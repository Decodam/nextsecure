import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { BookIcon, ShieldIcon, RocketIcon, ChevronRightIcon, DatabaseIcon, HeartIcon } from "lucide-react"; 
import { SvgBrandGithub } from "@/auth/ui/brands";
import CopyButton from "@/components/content/copyButton";
import { SignedIn, SignedOut } from "@/auth/session";
import { ThemeToggleIconButton } from "@/components/ui/theme";
import UserButton from "@/auth/ui/userButton";

export default function Home() {
  return (
    <main>
      <div className="absolute top-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(117,248,124,0.5)] dark:bg-[rgba(117,248,124,0.2)] opacity-50 blur-[80px]"></div>
      </div>

      <nav className="container h-16 flex justify-between items-center">
        <Link href="/">
          <Image src={"/icon.png"} width={40} height={40} alt="logo" />
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Signup</Link>
              </Button>
            </SignedOut>
          </div>
          <ThemeToggleIconButton />
        </div>
      </nav>

      <div className="container pt-16 pb-24 lg:pb-32">
        <div className="flex justify-center">
          <CopyButton 
            textToCopy="npx create-next-app -e https://github.com/Decodam/nextsecure"
            title={"Get started - Create Next App"}
          />
        </div>

        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            NextSecure
          </span> - Next.js Auth Starter Template
          </h1>
        </div>
        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-xl text-muted-foreground">
            Kickstart your next project with prebuilt authentication templates using Auth.js and Prisma Adapter, already set up for you!
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button size={"lg"} className="bg-foreground/95 hover:bg-foreground" asChild>
            <Link className="space-x-2" 
              href="https://github.com/Decodam/nextsecure"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SvgBrandGithub /> <span>Github Repo</span>
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
            <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="container max-w-screen-md grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/10 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DatabaseIcon className="mr-2 h-5 w-5 text-[#47A248]" />
              Prisma Adapter
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Learn about Prisma ORM and it&apos;s features and how to integrate it into your applications.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link 
              className="text-sm hover:text-primary hover:underline" 
              href="https://nextjs.org/docs"
              target="_blank" rel="noopener noreferrer"
            >
              Explore Adapter
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-card/10 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookIcon className="mr-2 h-5 w-5 text-[#47A248]" />
              Next.js Docs
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Master the React framework for production-grade applications.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link 
              className="text-sm hover:text-primary hover:underline" 
              href="https://nextjs.org/docs"
              target="_blank" rel="noopener noreferrer"
            >
              Learn Next.js
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-card/10 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldIcon className="mr-2 h-5 w-5 text-[#47A248]" />
              Auth.js Docs
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Authentication for the Web. Free, easy to configure and open source.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link 
              className="text-sm hover:text-primary hover:underline" 
              href="https://authjs.dev/getting-started"
              target="_blank" rel="noopener noreferrer"
            >
              Get Started
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-card/10 text-foreground">
          <CardHeader>
            <CardTitle className="flex items-center">
              <RocketIcon className="mr-2 h-5 w-5 text-[#47A248]" />
              Starter Kit
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Get started with our comprehensive starter kit documentation.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link 
              className="text-sm hover:text-primary hover:underline" 
              href="https://github.com/Decodam/nextsecure#readme"
              target="_blank" rel="noopener noreferrer"
            >
              Explore Documentaion
            </Link>
          </CardFooter>
        </Card>
      </div>

      <footer className="container w-full mt-14">
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-xs leading-loose text-muted-foreground md:text-left">
              Built with <HeartIcon className="inline-block h-4 w-4 text-red-500" /> by{" "}
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
              <SvgBrandGithub size={24} />
              Project Repository
            </Link>
          </div>
          <p className="text-center text-xs text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} NextSecure. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}