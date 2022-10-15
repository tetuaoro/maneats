import dynamic from "next/dynamic"
import Login from "./login"

import type { PropsWithChildren } from "react"

const loading = () => <main className="w-100 min-vh-100 p-3 p-sm-4 bg-gray-300"></main>

const Account = dynamic(() => import("./account"), { loading })
const Services = dynamic(() => import("./services"), { loading })
const Prices = dynamic(() => import("./prices"), { loading })
const Bills = dynamic(() => import("./bills"), { loading })
const Annoucement = dynamic(() => import("./ad"), { loading })

export { Login, Account, Services, Prices, Bills, Annoucement }

const Component = (props: PropsWithChildren) => {
  return <div className="w-100 min-vh-100 p-3 p-sm-4 bg-gray-300">{props.children}</div>
}

export default Component
