import Image from "next/image"
import { sitename } from "@libs/app"

import styles from "@styles/Header.module.css"
import couverture from "@images/cover.jpg"

const Header = () => {
  return (
    <header className={styles.displayUnset}>
      <Image priority className="border-bottom border-5 border-primary" alt={`Bannière de ${sitename}`} src={couverture} />
    </header>
  )
}

export default Header
