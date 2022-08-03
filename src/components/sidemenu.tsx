import { useRouter } from "next/router"
import Link from "next/link"
import styles from "@styles/Dashboard.module.scss"

const Component = () => {
  const { pathname } = useRouter()
  return (
    <header className="vh-100 bg-gray-900">
      <nav className={`${styles.sidemenu}`}>
        <ul className="flex-column px-2">
          <li className="py-sm-3">
            <Link href="/dashboard">
              <a className={`px-5 ${pathname==="/dashboard" ? styles.active : styles.link}`}>
                Mon compte
              </a>
            </Link>
          </li>
          <li className="py-sm-3">
            <Link href="/dashboard/services">
              <a className={`px-5 ${pathname==="/dashboard/services" ? styles.active : styles.link}`}>
                Mes services
              </a>
            </Link>
          </li>
          <li className="py-sm-3">
            <Link href="/dashboard/devis-factures">
              <a className={`px-5 ${pathname==="/dashboard/devis-factures" ? styles.active : styles.link}`}>
                Devis/Factures
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Component
