import MasterForm from "./forms"

const Component = () => {
  return (
    <>
      <h2 id="estimation" className="conthrax">
        <a href="#estimation">Faire une estimation de prix</a>
      </h2>

      <section className="py-3 py-sm-5">
        <MasterForm />
      </section>
    </>
  )
}

export default Component
