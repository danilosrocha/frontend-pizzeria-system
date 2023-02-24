import React, { useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss'
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Header } from "@/components/Header";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "@/services/api";
import Modal from 'react-modal';
import { ModalOrder } from "@/components/ModalOrder";

interface OrderProps {
  id: string,
  table: string | number,
  status: boolean,
  drafts: boolean,
  name: string | null
}
interface HomeProps {
  orders: OrderProps[]
}

export interface OrderItemProps {
  id: string
  amount: number
  order: Order
  product: Product
}

export interface Order {
  id: string
  table: string | number
  name: string | null
  status: boolean
  draft: boolean
}

export interface Product {
  id: string
  name: string
  price: string
  description: string
}


const Dashboard = ({ orders }: HomeProps) => {
  const [orderList, setOrderList] = useState(orders || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCloseModal() {
    setModalIsOpen(false)
  }

  async function handlOpenModalView(id: string) {
    const apiClient = setupAPIClient()

    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id
      }
    })

    setModalItem(response.data)
    setModalIsOpen(true)
  }

  Modal.setAppElement('#__next');
  return (
    <>
      <Head>
        <title>Painel - Sistema Pizzaria</title>
      </Head>

      <Header />

      <main className={styles.container}>

        <div className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button>
            <FiRefreshCcw color="#3fffa3" size={25} />
          </button>
        </div>

        <article className={styles.listOrders}>
          {orderList.map(item => (
            <section key={item.id} className={styles.orderItem}>
              <button onClick={() => handlOpenModalView(item.id)}>
                <span>Mesa {item.table}</span>
              </button>
            </section>
          ))}
        </article>
      </main >

      {modalIsOpen && (
        <ModalOrder
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          order={modalItem}
        />
      )}
    </>
  )
}

export default Dashboard;

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/orders').then((response) => { return response }).catch((err) => { return err })

  return {
    props: {
      orders: response.data
    }
  }
})