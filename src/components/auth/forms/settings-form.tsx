"use client"
 
import { useState, useTransition } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { RotateCw } from "lucide-react"

import FormError from "./form-error"
import FormSucess from "./form-success"

import SettingsSchema, { TSettingsSchema } from "@/schemas/settings-schema"

import { useSession } from "next-auth/react"

import { settings } from "@/actions/settings"

import { useCurrentUser } from "@/hooks/user"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"





const SettingsForm = () => {
  const { update } = useSession()
  const user = useCurrentUser()

  const [isPending, startTransition] = useTransition();

  const [success, setSuccess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()


  // 1. Define your form.
  const form = useForm<TSettingsSchema>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {      
      name: user?.name || undefined,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: TSettingsSchema) {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    startTransition(() => {
      settings(values)
      .then(data => {
        if (data.success) {
          /*
            Update the session but what this function does is run
            auth callbacks again. 
          */          
          update()
          setSuccess(data.success)
        }
      })
      .catch(error => setError(error.message))
    })
  }  
  
  
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            {/* Runtime messages. */}
            <FormSucess message={success} />
            <FormError message={error} />
            
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-7">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              {isPending ? (
                <span>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </span>
              ) : (
                <span>Save</span>
              )}
            </Button>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsForm