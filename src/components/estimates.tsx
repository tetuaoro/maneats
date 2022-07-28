import { useRecoilValue } from "recoil"
import { appName } from "@libs/recoilState"

import MasterForm from "./forms"

const Component = () => {
  const name = useRecoilValue(appName)

  return (
    <>
      <h2 id="estimation">
        <a href="#estimation">Faire une estimation de prix</a>
      </h2>

      <section className="py-3 py-sm-5">
        <p>My app name is {name}.</p>
        <MasterForm />
      </section>
    </>
  )
}

export default Component
