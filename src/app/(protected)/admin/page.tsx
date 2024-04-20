"use client"

import { admin } from "@/actions/admin"

import FormSucess from "@/components/auth/forms/form-success"
import RoleGate from "@/components/auth/role-gate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { UserRole } from "@prisma/client"

import { toast } from "sonner"


const AdminPage = async () => {
  const handleServerActionClick = () => {
    admin()
    .then(data => toast.success(data.success))
    .catch(error => toast.error(error.message))
  }

  const handleAPIRouteClick = () => {
    fetch("/api/admin")
    .then(response => {
      if (response.ok) toast.success("Allowed API Route")
      else toast.error("Forbidden API route")
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSucess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>
          <Button onClick={handleAPIRouteClick}>
            Click to test
          </Button>  
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server action
          </p>
          <Button onClick={handleServerActionClick}>
            Click to test
          </Button>  
        </div>

      </CardContent>
    </Card>
  )
}




export default AdminPage