'use client'

import React, { startTransition, useState, useTransition } from 'react'
import { z } from "zod";

// Server actions.
import { login } from '@/actions/login';

// Custom schemas.
import LoginSchema, { type TLoginForm } from '@/schemas/login-form';

// Custom components.
import CardWrapper from './card-wrapper'
import FormError from '../form-error';

// From react-hook-form
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// From shadcn ui.
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
import FormSucess from '../form-success';



const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTranstion] = useTransition()

  const reactHookForm = useForm<TLoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // console.log('Errors: ', reactHookForm.formState.errors)

  // submit handler.
  const onSubmit = ( values: TLoginForm ) => {
    // Clear runtime messages first.
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values)
        .then(data => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
  }


  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
      showSocial
    >

      <Form {...reactHookForm}>
        <form 
          onSubmit={reactHookForm.handleSubmit(onSubmit)}
          className='space-y-6'
        >

          <div className='space-y-4'>

            {/* Runtime messages. */}
            <FormError message={error} />
            <FormSucess message={success} />

            <FormField
              control={reactHookForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='email goes here.'
                      type='email'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={reactHookForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='password goes here.'
                      type='password'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={isPending}
              className='w-full'
            >
              Login
            </Button>   
          </div>

        </form>
      </Form>

    </CardWrapper>
  )
}

export default LoginForm