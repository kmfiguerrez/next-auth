"use client"

import { useTransition } from "react"

import { settings } from "@/actions/settings"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSession } from "next-auth/react"


const SettingsPage = () => {
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      settings({name: "kimjoon"})
      .then(data => {
        /*
          Update the session but what this function does is run
          auth callbacks again. 
        */
        update()
      })
      .catch(error => console.log(error.message))
    })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={handleClick}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  )
}

export default SettingsPage