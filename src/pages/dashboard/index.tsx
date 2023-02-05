import React from "react";
import Head from "next/head";
import styles from './styles.module.scss'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";


const Dashboard = () => {

  return (
    <>
      <Head>
        <title>Painel - Sistema Pizzaria</title>
      </Head>

      <Header />

      <main className={styles.containerCenter}>
        <h1>Bem vindo ao Painel</h1>
      </main >
    </>
  )
}

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})