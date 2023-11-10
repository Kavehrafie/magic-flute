import { useEffect, useState } from "react";

export default function ModeToggle() {
  const [theme, setThemeState] = useState<
    "theme-light" | "dark" | "system"
  >("theme-light")

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "theme-light")
  }, [])

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])

  return (

    <>


      <div className="flex gap-x-4">

    <button type='button' onClick={() => setThemeState("dark")}>dark</button>
    <button type='button' className='dark:bg-amber-700 rounded-md px-4 py-2 bg-amber-200' onClick={() => setThemeState("theme-light")}>light</button>
      </div>
    </>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" size="icon">
    //       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //       <span className="sr-only">Toggle theme</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={() => setThemeState("theme-light")}>
    //       Light
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setThemeState("dark")}>
    //       Dark
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setThemeState("system")}>
    //       System
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  )
}