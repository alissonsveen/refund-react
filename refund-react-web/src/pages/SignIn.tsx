import { useActionState } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

const signInScheme = z.object({
    email: z.string().email({ message: "E-mail é inválido"}),
    password: z.string().trim().min(1, {message: "Informe a senha"})
})

export function SignIn(){
    const [state, formAction, isLoading] = useActionState(signIn, null)

    const auth = useAuth()

   async function signIn(_: any, formData: FormData){   
    try {
        const data = signInScheme.parse({
            email: formData.get("email"),
            password: formData.get("password")
        })

        const response = await api.post("/sessions", data)
        auth.save(response.data)

     } catch(error) {
        console.log(error)
        
        if(error instanceof ZodError) {
            return { message: error.issues[0].message }
        }

        if(error instanceof AxiosError) {
            return { message: error.response?.data.message }
        }

        return { message: "Não foi possível entra!" }
     }
    }

    return (
     <form action={formAction} className="w-full flex flex-col gap-4">
        <Input name="email"  required legend="E-mail" type="email" placeholder="seu@email.com"/>
        <Input name="password" required legend="Senha" type="password" placeholder="123456"/>

        <p className="text-sm text-red-600 text-center my-4 font-medium">
            {state?.message}
        </p>

        <Button type="submit" isLoading={isLoading}>
            Entrar
        </Button>

        <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Criar conta</a>
     </form>
    )
}