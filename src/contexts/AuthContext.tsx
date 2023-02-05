import { createContext, ReactNode, useState, useEffect } from 'react'
import Router from 'next/router';
import { api } from '@/services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify';
interface AuthContextData {
    user: UserProps
    isAuththenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    signOut: () => void
}

interface UserProps {
    id: string,
    name: string,
    email: string
}

interface SignInProps {
    email: string,
    password: string
}

interface SignUpProps {
    name: string,
    email: string,
    password: string
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/signin');
    } catch (error) {
        console.log("Erro ao deslogar");
    }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserProps>()//{} as UserProps
    const isAuththenticated = !!user;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies()

        if (token) {
            api.get('/userInfo').then(response => {
                const { email, id, name } = response.data as UserProps

                setUser({
                    id,
                    name,
                    email
                })
            }).catch(err => {
                signOut();
            })
        }

    }, [])


    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email, password
            })

            const { id, name, token } = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 1,
                path: '/'
            })

            setUser({
                id,
                name,
                email
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            Router.push('/dashboard')

            toast.success("Logado com sucesso!")

        } catch (error) {
            console.log("Erro ao acessar", error);
            toast.error("Erro ao acessar!")
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            console.log(" --> Cadastrado com sucesso!");

            Router.push('/signin')

            toast.success("Conta criada com sucesso!")
        } catch (error) {
            console.log("Erro ao cadastrar", error);
            toast.error("Erro ao cadastrar!")
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuththenticated, signIn, signUp, signOut }} >
            {children}
        </AuthContext.Provider >
    )
}