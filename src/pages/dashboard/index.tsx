import React from "react";
import Head from "next/head";
import styles from './styles.module.scss'


const Dashboard = () => {

  return (
    <>
      <Head>
        <title>SistemaPizzaria - Faça seu login</title>
      </Head>

      <main className={styles.containerCenter}>
        <h1>Bem vindo ao Painel</h1>
      </main >


    </>
  )
}

export default Dashboard;