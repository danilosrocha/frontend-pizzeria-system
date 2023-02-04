import React, { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logoImg from '../../assets/logo.svg'
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import styles from './styles.module.scss'
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";

const SignIn = () => {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha os dados!')
      return
    }

    setLoading(true)

    await signIn({ email, password })

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SistemaPizzaria - Faça seu login</title>
      </Head>

      <main className={styles.containerCenter}>
        <Image className="logo" src={logoImg} alt="Logo sistema Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>
          </form>

          <Link className={styles.textLink} href='/signup'>
            Não possui uma conta? <strong>Cadastre-se</strong>
          </Link>

        </div>
      </main>
    </>
  )
}

export default SignIn;