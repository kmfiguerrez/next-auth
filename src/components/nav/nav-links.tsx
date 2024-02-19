'use client'

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link"


const NavLinks = () => {
  return (
    <NavigationMenu className="max-w-full justify-end border">
      <NavigationMenuList className="space-x-5">

        <NavigationMenuItem>
          <Link href={`/auth/register`} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Register
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={`/auth/login`} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Login
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavLinks