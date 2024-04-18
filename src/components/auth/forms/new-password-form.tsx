"use client"

import { useState, useTransition } from "react"

import { useSearchParams } from "next/navigation"

import CardWrapper from "../card-wrapper"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { RotateCw } from "lucide-react"

import NewPasswordSchema, { TNewPasswordSchema } from "@/schemas/new-password-schema"

import { newPassword } from "@/actions/new-password"

import FormError from "./form-error"
import FormSucess from "./form-success"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"






const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  // 1. Define your form.
  const form = useForm<TNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: TNewPasswordSchema) {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)

    if (isPending) alert("pending")

    startTransition(() => {
      newPassword(values, token)
        .then(data => {
          setSuccess(data?.success)

          // Reset form.
          form.reset()
        })
        .catch(error => {
          setError(error.message)
        })
    })
  }


  return (
    <CardWrapper
      title="Create new password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      className="mx-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* Runtime messages. */}
          <FormSucess message={success} />
          <FormError message={error} />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-7">
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {isPending ? (
              <span>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </span>
            ) : (
              <span>Update password</span>
            )}
          </Button>

        </form>
      </Form>
    </CardWrapper>
  )
}

export default NewPasswordForm