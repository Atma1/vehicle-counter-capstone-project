"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import Link from "next/link"
import { Globe } from "lucide-react"
import { login } from "@/actions/auth"
import { providerMap } from "@/auth.config"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-black">
        <CardHeader className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">Vehicle Counter</span>
          </Link>
          <CardDescription className="text-white">
            Select one of the following login methods to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Object.values(providerMap).map((provider) => (
            <form
              action={() => login(provider.id)}
              key={provider.id}>
              <Button variant="outline" className="w-full" type="submit">
                <span>Login with {provider.name}</span>
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
