import React, { FormEvent, useState, ChangeEvent } from "react";
import Head from "next/head";
import styles from './styles.module.scss'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import { setupAPIClient } from "@/services/api";
import { toast } from 'react-toastify';
import { FiUpload } from 'react-icons/fi'

interface ItemProps {
  id: string,
  name: string
}

interface CategoryProps {
  categoryList: ItemProps[]
}

const Product = ({ categoryList }: CategoryProps) => {
  const [name, setName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [imageAvatar, setImageAvatar] = useState(null)
  const [categories, setCategories] = useState(categoryList)
  const [categorySelected, setCategorySelected] = useState(0)

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const image = event.target.files[0]

    if (!image) {
      return
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      return
    }

    const apiClient = setupAPIClient();

    await apiClient.post('/product', {
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

  function handleChangeCategory(event) {
    setCategorySelected(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Novo produto - Sistema Pizzaria</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>Novo produto</h1>

        <form className={styles.form} onSubmit={handleRegister}>

          <label className={styles.labelAvatar}>
            <span>
              <FiUpload color="#fff" size={30} />
            </span>

            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />


            {avatarUrl && (
              <img className={styles.preview} src={avatarUrl} alt="Foto do produto" width={250} height={250} />
            )}


          </label>

          {categories.length > 0 ? (
            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <select>
              <option>Cadastre uma categoria</option>
            </select>
          )}

          <input className={styles.input} type="text" placeholder="Digite o nome do produto" />

          <input className={styles.input} type="text" placeholder="Preço do produto" />

          <textarea className={styles.input} placeholder="Descreva seu produto..." />

          <button type="submit" >
            Cadastrar
          </button>

        </form>
      </main>

    </>
  )
}

export default Product;

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/categories').then((response) => { return response }).catch((err) => { return err })

  return {
    props: {
      categoryList: response.data
    }
  }
})