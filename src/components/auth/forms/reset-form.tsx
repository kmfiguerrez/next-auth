"use client"

import { useState, useTransition } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { RotateCw } from "lucide-react"

import ResetSchema, { TResetSchema } from "@/schemas/reset-schema"
import { reset } from "@/actions/reset"

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






const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  // 1. Define your form.
  const form = useForm<TResetSchema>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: TResetSchema) {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)

    if (isPending) alert("pending")

    startTransition(() => {
      reset(values)
        .then(data => {
          setSuccess(data?.success)
        })
        .catch(error => {
          setError(error.message)
        })
    })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        {/* Runtime messages. */}
        <FormSucess message={success} />
        <FormError message={error} />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-7">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

        />

        <Button 
          type="submit"
          disabled={success ? true : false}
          className="w-full"
        >
          {isPending ? (
            <span>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </span>
          ) : (
            <span>Forgot password</span>
          )}
        </Button>

      </form>
    </Form>
  )
}

export default ResetForm