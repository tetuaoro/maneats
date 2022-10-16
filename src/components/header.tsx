import Image from "next/image"
import { sitename } from "@libs/app"

import styles from "@styles/Header.module.css"
import couverture from "@images/cover.jpg"

const Header = () => {
  return (
    <header className={styles.displayUnset}>
      <div className={styles.cover + " position-relative border-5 border-bottom border-primary"}>
        <Image priority alt={`Bannière de ${sitename}`} src={couverture} layout="fill" objectFit="cover" />
      </div>
    </header>
  )
}

export default Header
