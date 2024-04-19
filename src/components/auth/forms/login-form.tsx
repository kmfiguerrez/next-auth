"use client"
 
import { useState, useTransition } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import LoginSchema, { TLoginSchema } from "@/schemas/login-schema"

import { RotateCw } from "lucide-react"

import { login } from "@/actions/login"

import FormError from "./form-error"
import FormSucess from "./form-success"

import CardWrapper from "../card-wrapper"

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
import Link from "next/link"





const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [show2FA, setShow2FA] = useState<boolean>(false)

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
        if (data.success) setSuccess(data.success)
        
        // If users enabled 2FA.
        if (data.twoFA) {
          setSuccess("2FA code sent")
          setShow2FA(true)
        }
      })
      .catch(error => {
        setError(error.message)
      })
    })
  }  
  
  
  return (
    <CardWrapper 
      title='Login'
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
      className='mx-auto'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* Runtime messages. */}
          <FormSucess message={success} />
          <FormError message={error} />
          
          {!show2FA &&
            <>
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot password */}
              <Button 
                variant={"link"}
                asChild
                className="font-normal ps-0 mb-4 text-xs"
              >
                <Link 
                  href={"/auth/reset"}
                >
                  Forgot password
                </Link>
              </Button>
            </>
          }
          {show2FA &&
            <FormField
              control={form.control}
              name="twoFACode"
              render={({ field }) => (
                <FormItem className="mb-7">
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 2FA code here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              
            />
          }

          <Button type="submit" className="w-full">
            {isPending ? (
              <span>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </span>
            ) : (
              <span>{show2FA ? "Confirm" : "Login"}</span>
            )}
          </Button>

        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm