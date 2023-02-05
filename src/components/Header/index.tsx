import styles from './styles.module.scss'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '@/contexts/AuthContext'

export const Header = () => {
    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src="/logo.svg" alt="Sistema Pizzaria" width={190} height={60} />
                </Link>

                <ul className={styles.rightMenu}>
                    <Link href='/category'>
                        <p>Categoria</p>
                    </Link>

                    <Link href='/product'>
                        <p>Cardápio</p>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#fff' size={24} />
                    </button>
                </ul>

            </div >

        </header >
    )
}