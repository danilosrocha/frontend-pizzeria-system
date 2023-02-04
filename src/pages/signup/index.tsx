import Head from "next/head";
import Image from "next/image";
import logoImg from '../../assets/logo.svg'
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import styles from './styles.module.scss'
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { signUp } = useContext(AuthContext)

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            alert('Preencha os dados!')
            return
        }

        setLoading(true)

        await signUp({ name, email, password })

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>SistemaPizzaria - Faça seu Cadastro</title>
            </Head>

            <main className={styles.containerCenter}>
                <Image className="logo" src={logoImg} alt="Logo sistema Pizzaria" />
                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignUp}>
                        <Input
                            placeholder="Nome da Empresa"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <Input
                            placeholder="Digite seu email"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>
                    </form>
                    <Link className={styles.textLink} href='/signin'>
                        Já possui uma conta? <strong>Faça login</strong>
                    </Link>

                </div>
            </main>
        </>
    )
}

export default SignUp;