# Next Secure

NextSecure is a starter template using Next js, Next Auth V5, prisma orm, and shadcn ui components. With pre built ui and reusable components it will make your workflow 10 times faster! With NextSecure, configuring authentication is as easy as setting up your environment variables and connecting your database. With profile editing, o auth, password reset, account recovery and creation pre-build, here's a quick overview of how it works and what you need to do to get started.

# **Project Setup**

To add auth to a **new project**, you can follow the following steps.

1. You can either clone this repository and run `npm install` to start the project. Else you can run the following command on your terminal. Then go to Auth setup

```
npx create-next-app -e https://github.com/Decodam/nextsecure
```

If you want to add auth to an **existing project**, you can follow the following steps.

1. Just copy the `@/auth` directory to your project and add `@/app/(auth)` and `@/app/api` routes to your router and install `auth.js` and some required `shadcn` components to get started with an existing project.
    
    ```bash
    npm install next-auth@beta nodemailer
    
    npx shadcn@latest init
    npx shadcn@latest add accordion avatar button card dropdown-menu input label separator toast
    ```
    
2. Add prisma using the following command and copy the schema according to your database to the `schema.prisma` file as shown in Prisma Adaptor section
    
    ```bash
    npm install @prisma/client @auth/prisma-adapter
    npm install prisma --save-dev
    
    npx prisma init
    # add the required schema in the prisma/schema.prisma file
    npx prisma migrate dev
    ```
    
3. Add prisma adaptor in `@lib/prisma.js` file. If you are using typescript follow `auth.js` prisma documentation.
    
    ```jsx
    import { PrismaClient } from "@prisma/client";
    
    const globalForPrisma = globalThis || {};
    
    export const prisma = globalForPrisma.prisma || new PrismaClient();
    
    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
    ```
    
4. Add a post install script for prisma in the `package.json` file for production
    
    ```text
    {
      ...
      "scripts": {
    	  ...
        "postinstall": "prisma generate" #add this line
      },
      "dependencies": {
        ...
      },
      "devDependencies": {
    	  ...
        "prisma": "^5.19.0",
      }
    }
    ```
    
5. You can now add the environment as shown below

## Auth Setup

Once your project is setup, follow the following steps to configure auth.

1. Create your `AUTH_SECRET` variable using the following command:
    
    ```bash
    openssl rand -base64 32
    ```
    
2. Add enviornment variables at the `.env.local` and `.env` file.
    
    ```bash
    # Add these to the .env.local file for next js
    
    # Generated secret key
    AUTH_SECRET=<copy_previously_generated_auth_secret>
    
    # Generate github oauth client from: https://github.com/settings/developers
    GITHUB_CLIENT_ID=<github_client_id>
    GITHUB_CLIENT_SECRET=<github_client_secret>
    
    # ... you can add more providers
    
    # Email keys according to your provider (resend, sendgrid, gmail smtp, etc.)
    EMAIL_SERVER=smtp://username:password@smtp.example.com:587
    EMAIL_FROM=noreply@example.com
    ```
    
    ```bash
    # Add this to .env file for prisma
    
    # if using mongodb replace the url with mongodb connection url.
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
    ```
    
3. Go to the `@/auth` folder and in `provider.js` add your necessary o auth providers.
    
    ```
    // you can import or even add more brand icons in @/auth/ui/brands file.
    import { SvgBrandGithub } from "@/auth/ui/brands";
    import GitHubProvider from "next-auth/providers/github";
    
    export const OAuthProviders = [
      {
        provider: "github",
        icon: SvgBrandGithub,
        config: GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
      },
      /* Add more providers here as shown above */
    ];
    ```
    
4. That’s all! Your project has now authentication and user management with profile editing, o auth, password reset, account recovery and creation!

# Prisma Adaptor

Next Secure uses prisma orm to manage the database. This allows easier interaction with postgres and also the flexibility to shift to mongo db for no-SQL. The following changes were made from the default table of the schema available at `auth.js` documentation.

- Added `isActive` and `role` fields to the `User` model.
- Added `Credential` and `Preregistration` models.
- Added `@index` annotations where needed to match the PostgreSQL schema indexes.
- Ensured that all optional fields in PostgreSQL have equivalent optional fields in MongoDB.
- Updated `@relation` fields to include `onDelete: Cascade` for appropriate models.

**Available Schema:**

[Postgres Schema](_schemas/postgres.schema)

[MongoDB Schema](_schemas/mongo.schema)

# Components

The starter template comes with many built in components and forms for better work flow.

## Session Management

NextSecure caches the server session. This reduces the number of request to the database with the JWT token.

```jsx
// @/auth/session.js
import { auth } from "@/auth/core";
import { cache } from "react";

const getServerSession = cache(auth);
export default getServerSession
```

You can conditionally render components using `SignedIn` and `SignedOut` components as show.

```jsx
import { SignedIn, SignedOut } from "@/auth/session";
import { logout } from "@/auth/actions"; 
import UserButton from "@/auth/ui/userButton";

export default function Home() {
 return (
  <div>
   <SignedIn>
    {/* user button gives the user, profile settings and logout control */}
    <UserButton />
    {/* 
     logout is a server action you can also pass the redirect url
     () => {logout("/somewhere")}
    */}
    <form action={logout}>
     <button>Logout now<button>
    </form>
   </SignedIn>
   <SignedOut>
    {/* renders child element in in */}
   </SignedOut>
  </div>
 )
}
```

## Route Protection

You can protect your private routes using `protectRoute` function as shown here.

```jsx
import { protectRoute } from "@/auth/session";

export default async function PrivatePage({}) {
 // unauthenticated users will be redirected to /login with next=/private
  const session = await protectRoute("/private");

  return (
    <div>
      PrivatePage <br />
      {JSON.stringify(session)}
    </div>
  );
}
```

You can also ensure logged in user can’t reach auth pages using `redirectOnAuth` function.

```jsx
import { redirectOnAuth } from "@/auth/session";

export default async function AuthLayout({children}) {
  // you can also provide redirectTo route as an argument "/profile"
  await redirectOnAuth();

  return (
    <div className="py-14 container">
      {children}
    </div>
  );
}
```

You can also protect your **API route handlers** like this.

```js
import { auth } from "@/auth/core"
import { NextResponse } from "next/server"

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
 /* ... */
}
```

## Role based protection

You can implement role based protection for your routes using `protectRouteWithRole` which is similar to normal protection but also assesses the user’s role.

```jsx
import { protectRouteWithRole } from "@/auth/session";

export default async function AdminPage({}) {
	// you can provide sepecific role as an argument, by default role is "admin"
	// the user will be redirect to /private route if he is not admin
  const session = await protectRouteWithRole("admin", "/private");

  return (
    <div>
      Admin Page - Only Admins can visiit <br />

      {JSON.stringify(session)}
    </div>
  );
}
```

# Pre-build Routes Forms

The `@/app/(auth)` folder has the authentication related routes it has three components:

1. Login Form for `/login` — `login.form.jsx`
2. Signup Form for `/signup` — `signup.form.jsx`
3. Account Recovery Form for `/account-recovery` — `accountRecovery.form.jsx`

These forms are fully customisable and also has a `borderless` prop to remove the borders and shadows if u want to use them inside any other custom component, say a modal.

# **Contributing**

We welcome contributions to enhance the functionality and usability of this project. If you’d like to contribute, here’s how you can get involved:

1. **Fork the Repository**: Create your own fork of the repository to work on your changes.
2. **Create a Branch**: Develop your feature or fix on a new branch.
3. **Make Changes**: Implement your changes and ensure they are well-tested.
4. **Submit a Pull Request**: Once your changes are ready, submit a pull request describing your modifications and the problem they solve.

# **Upcoming changes and updates**

1. I am currently trying to get sessions authentication working with `auth.js` but it isn’t helping as of now because it doesn’t supports credential login.

---

❤️ Thanks a lot for visiting. Built with love by [@Decodam](https://github.com/Decodam)

- **Linkedin —** [@arghya-mondal-work](https://www.linkedin.com/in/arghya-mondal-work/)
- **Instagram** — [@arghya__mondal](https://www.instagram.com/arghya__mondal/)