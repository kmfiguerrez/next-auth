'use client'

import React, { startTransition, useState, useTransition } from 'react'
import { z } from "zod";

// Server actions.
import { register } from '@/actions/register';

// Custom schemas.
import RegisterSchema, { type TRegisterForm } from '@/schemas/register-form'

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



const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTranstion] = useTransition()

  const reactHookForm = useForm<TRegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  // console.log('Errors: ', reactHookForm.formState.errors)

  // submit handler.
  const onSubmit = ( values: TRegisterForm ) => {
    // Clear runtime messages first.
    setError("")
    setSuccess("")

    startTransition(() => {
      register(values)
        .then(data => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
  }


  return (
    <CardWrapper
      headerLabel='Create an account'
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='name goes here.'
                      type='text'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              Register
            </Button>   
          </div>

        </form>
      </Form>

    </CardWrapper>
  )
}

export default RegisterForm