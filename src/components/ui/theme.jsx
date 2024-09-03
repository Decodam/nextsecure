"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sun, MoonStar } from "lucide-react"


export function DropdownThemeSelectorIconButton() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonStar className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ThemeToggleIconButton() {
  const { setTheme } = useTheme();

  return(
    <>
      <Button onClick={() => setTheme("dark")} className="dark:hidden" variant="ghost" size="icon">
        <Sun size={20} />
        <span className="sr-only">Go Dark</span>
      </Button>
      <Button onClick={() => setTheme("light")} className="dark:flex hidden" variant="ghost" size="icon">
        <MoonStar size={20} />
        <span className="sr-only">Go Dark</span>
      </Button>
    </>
  )
}