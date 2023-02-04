import Head from "next/head";
import Image from "next/image";
import Router from 'next/router';
import logoImg from '../assets/logo.svg'
import styles from '../styles/home.module.scss'
import { FaSpinner } from 'react-icons/fa'
import { useEffect } from "react";

const Preload = () => {

  useEffect(() => {
    setTimeout(() => {
      Router.push('/signin');
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>Sistema Pizzaria</title>
      </Head>

      <main className={styles.containerCenter}>
        <Image className="logo" src={logoImg} alt="Logo sistema Pizzaria" />
        <FaSpinner color='#fff' size={16} />
      </main>
    </>
  )
}

export default Preload;