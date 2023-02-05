import styles from './styles.module.scss'
import { FiLogOut } from 'react-icons/fi'
import Link from 'next/link'

export const RightNav = () => {
    return (
        <ul className={styles.rightNav}>
            <Link href='/category'>
                <p>Categoria</p>
            </Link>

            <Link href='/product'>
                <p>Cardápio</p>
            </Link>

            <button >
                <FiLogOut color='#fff' size={24} />
            </button>
        </ul>
    )
}