import React, { FormEvent, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import { setupAPIClient } from "@/services/api";
import { toast } from 'react-toastify';

const Category = () => {
  const [name, setName] = useState("")

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      return
    }

    const apiClient = setupAPIClient();

    await apiClient.post('/category', {
      name,
    }).then((result) => { toast.success("Categoria cadastrada com sucesso!") }).catch((error) => {
      if (error.response.status === 400) {
        console.log(error.response.data);

        toast.error(`Ocorreu um erro na tentativa de cadastro: "${error.response.data.error}"`)
        return false
      }
    })

    setName("")
  }

  return (
    <>
      <Head>
        <title>Nova Categoria - Sistema Pizzaria</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>Cadastrar categorias</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Digite o nome da categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit" >
            Cadastrar
          </button>

        </form>
      </main>

    </>
  )
}

export default Category;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})