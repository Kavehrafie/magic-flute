import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { cn } from "@utils/tw.ts";

export default function ModeToggle({ className }: HTMLFormElement) {
  const [theme, setThemeState] = useState<"theme-light" | "dark" | "system">(
    "theme-light"
  );

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  useEffect(() => {
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className={cn("bg-slate-50 dark:bg-slate-950 p-0.5 hover:ring-2 hover:ring-slate-200 hover:bg-slate-100 focus:ring-slate-600 rounded-full")}>
        {isDark ? (
          <Icon icon="tabler:moon" className={cn(className, 'h-8 w-8')} />
        ) : (
          <Icon icon="tabler:sun" className={cn(className, 'h-8 w-8')} />
        )}
      </Menu.Button>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
      <Menu.Items className={cn(navMenuItemsStyle(), className)} as="ul">
        <Menu.Item as={Fragment}>
          {({ active }) => (
            <li className="px-1 py-1">
            <button
              onClick={() => setThemeState("theme-light")}
              className={cn(navMenuButtonStyle(), [
                active ? " bg-foreground text-white" : "bg-white text-black"
              ])}
            >
              light
            </button>
            </li>
          )}
        </Menu.Item>
        <Menu.Item as={Fragment}>
          {({ active }) => (
            <li className="px-1 py-1">
              <button
                onClick={() => setThemeState("dark")}
                className={cn(navMenuButtonStyle(), [
                  active ? " bg-foreground text-white" : "bg-white text-black"
                ])}
              >
                dark
              </button>
            </li>
          )}
        </Menu.Item>
        <Menu.Item as={Fragment}>
          {({ active }) => (
            <li className="px-1 py-1">
              <button
                onClick={() => setThemeState("system")}
                className={cn(navMenuButtonStyle(), [
                  active ? " bg-foreground text-white" : "bg-white text-black"
                ])}
              >
                system
              </button>
            </li>
          )}
        </Menu.Item>
      </Menu.Items>
        </Transition>
    </Menu>
  );
}

export function navMenuButtonStyle() {
    return 'w-full justify-center rounded px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
}

export function navMenuItemsStyle() {
    return 'absolute border border-foreground top-[4em] right-0 mt-2 w-26 origin-top-right rounded bg-card shadow-[4px_3px_0px_0px_hsl(var(--foreground))] ring-1 ring-black/5 focus:outline-none'
}