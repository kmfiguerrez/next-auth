"use client"
 
import { useState, useTransition } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import LoginSchema, { TLoginSchema } from "@/schemas/login-schema"

import { RotateCw } from "lucide-react"

import { login } from "@/actions/login"

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





const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  // 1. Define your form.
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {      
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: TLoginSchema) {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    
    if (isPending) alert("pending")

    startTransition(() => {
      login(values)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Runtime messages. */}
        <FormSucess message={success} />
        <FormError message={error} />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} type="password" />
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
            <span>Login</span>
          )}
        </Button>

      </form>
    </Form>
  )
}

export default LoginForm