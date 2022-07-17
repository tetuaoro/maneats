import type { NextPage } from "next"
import Head from "next/head"
import { sitename } from "@utils/siteinfos"
import { Table } from "react-bootstrap"

const title = sitename + " | Tarifs"
const description = `Visualiser les tarifs de ${sitename} et préparer vos livraisons, depuis Tahiti ou depuis les îles.`

const Page: NextPage = () => {
  return (
    <main className="container pt-5">
      <Head>
        <meta name="description" content={description} />
        <title>{title}</title>
      </Head>
      <h1>Tarifs</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat qui aperiam neque nostrum voluptatibus dignissimos vitae voluptate? Amet veniam consequuntur ducimus est error? Eius maiores
        culpa quam. Labore, quasi cumque.
      </p>
      <h2 className="mt-5">Tahiti</h2>
      <Table bordered hover responsive="sm">
        <caption>La livraison est couverte de Papara à Papenoo</caption>
        <thead>
          <tr>
            <th>Secteur de livraison</th>
            <th>
              Volume au m<sup>3</sup>
            </th>
            <th>Poids au kg</th>
            <th>Prix TTC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Papara</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>2000 XPF</td>
          </tr>
          <tr>
            <td>Paea</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1700 XPF</td>
          </tr>
          <tr>
            <td>{"Puna'auia"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1500 XPF</td>
          </tr>
          <tr>
            <td>{"Faa'a"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1300 XPF</td>
          </tr>
          <tr className="fw-bold text-primary">
            <td>{"Papeete"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1000 XPF</td>
          </tr>
          <tr>
            <td>{"Pirae"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1300 XPF</td>
          </tr>
          <tr>
            <td>{"Arue"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1500 XPF</td>
          </tr>
          <tr>
            <td>{"Mahina"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1700 XPF</td>
          </tr>
          <tr>
            <td>{"Papenoo"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>2000 XPF</td>
          </tr>
        </tbody>
      </Table>
      <h2 className="mt-5">Dans les îles</h2>
      <Table bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Secteur de livraison</th>
            <th>
              Volume au m<sup>3</sup>
            </th>
            <th>Poids au kg</th>
            <th>Prix TTC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Papara</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>2000 XPF</td>
          </tr>
          <tr>
            <td>Paea</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1700 XPF</td>
          </tr>
          <tr>
            <td>{"Puna'auia"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1500 XPF</td>
          </tr>
          <tr>
            <td>{"Faa'a"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1300 XPF</td>
          </tr>
          <tr className="fw-bold text-primary">
            <td>{"Papeete"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1000 XPF</td>
          </tr>
          <tr>
            <td>{"Pirae"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1300 XPF</td>
          </tr>
          <tr>
            <td>{"Arue"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1500 XPF</td>
          </tr>
          <tr>
            <td>{"Mahina"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>1700 XPF</td>
          </tr>
          <tr>
            <td>{"Papenoo"}</td>
            <td>1</td>
            <td>{"≦50"}</td>
            <td>2000 XPF</td>
          </tr>
        </tbody>
      </Table>
    </main>
  )
}

export default Page
