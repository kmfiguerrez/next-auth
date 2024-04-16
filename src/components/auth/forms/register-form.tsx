"use client"
 
import { useState, useTransition } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import RegisterSchema, { type TRegisterSchema } from "@/schemas/register-schema"

import { RotateCw } from "lucide-react"

import { register } from "@/actions/register"

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




const RegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: TRegisterSchema) {
    // Reset runtime messages first.
    setSuccess(undefined)
    setError(undefined)

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    
    if (isPending) alert("pending")

    startTransition(() => {
      register(values)
      .then(data => setSuccess(data.success))
      .catch(error => {
        // console.log(error)
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            <span>Register</span>
          )}
        </Button>

      </form>
    </Form>
  )
}

export default RegisterForm