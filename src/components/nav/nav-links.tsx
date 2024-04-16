
import Link from "next/link"

import SignOutButton from "../auth/signOut-button"

import { Button } from "../ui/button"

import { auth } from "@/auth"


const NavLinks = async () => {
  const session = await auth()

  return (
    <nav>
      <ul className="flex justify-end space-x-4">
        <li>
          <Button
            // variant={"link"}
            asChild
          >
            <Link href={"/auth/register"}>Register</Link>
          </Button>
        </li>


        {session === null ? (
            <li>
              <Button
                // variant={"link"}
                asChild
              >
                <Link href={"/auth/login"}>Login</Link>
              </Button>
            </li>
          ) : (
            <li>
              <SignOutButton />
            </li>
          )
        }

      </ul>
    </nav>
  )
}

export default NavLinks