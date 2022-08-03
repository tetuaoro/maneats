import type { NextPage } from "next"
import Head from "next/head"
import { sitename } from "@libs/app"
import { Table } from "react-bootstrap"

const title = sitename + " | Tarifs"
const description = `Visualiser les tarifs de ${sitename} et préparer vos livraisons, depuis Tahiti ou depuis les îles.`

const data = [
  {
    sectorName: "Papara",
    volumeMax: "1",
    weightMax: "50",
    price: "2000",
    currency: "XPF",
  },
  {
    sectorName: "Paea",
    volumeMax: "1",
    weightMax: "50",
    price: "1700",
    currency: "XPF",
  },
  {
    sectorName: "Puna'auia",
    volumeMax: "1",
    weightMax: "50",
    price: "1500",
    currency: "XPF",
  },
  {
    sectorName: "Faa'a",
    volumeMax: "1",
    weightMax: "50",
    price: "1300",
    currency: "XPF",
  },
  {
    sectorName: "Papeete",
    volumeMax: "1",
    weightMax: "50",
    price: "1000",
    currency: "XPF",
  },
  {
    sectorName: "Pirae",
    volumeMax: "1",
    weightMax: "50",
    price: "1300",
    currency: "XPF",
  },
  {
    sectorName: "Arue",
    volumeMax: "1",
    weightMax: "50",
    price: "1500",
    currency: "XPF",
  },
  {
    sectorName: "Mahina",
    volumeMax: "1",
    weightMax: "50",
    price: "1700",
    currency: "XPF",
  },
  {
    sectorName: "Papenoo",
    volumeMax: "1",
    weightMax: "50",
    price: "2000",
    currency: "XPF",
  },
]

const Page: NextPage = () => {
  return (
    <main className="container pt-5">
      <Head>
        <meta name="description" content={description} />
        <title>{title}</title>
      </Head>
      <h1 className="conthrax">Tarifs</h1>
      <p className="text-indent">{"Lorsqu'il s'agit de services de courrier, nous sommes les spécialistes."}</p>
      <p className="text-indent">
        {
          "Nous sommes dans ce secteur depuis des années et nous avons tout vu. Que vous expédiez un colis ou une palette, nous avons les tarifs et les zones de livraison dont vous avez besoin. Nous calculons nos tarifs en fonction des zones dans lesquelles vos marchandises seront livrées et récupérées, ainsi que de leur poids et de leur volume. Le tarif par secteur est appliqué pour les colis jusqu'à 1m"
        }
        <sup>3</sup>
        {" et 50kgs, au-delà, nous appliquons une formule basée sur le m"}
        <sup>3</sup>.
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="align-text-sub text-warning me-3 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        {
          "Les devis et les offres sont personnalisés ; ils varient en fonction du poids et du volume, du niveau d'urgence (par exemple, standard ou urgence) et de la distance parcourue pendant le transport. Les devis de livraison standard et express sont fournis sur notre site web et "
        }
        <span className="text-primary">doivent être validé par nos soins.</span>
      </p>
      <h2 id="tahiti" className="conthrax mt-5">
        <a href="#tahiti">Tahiti</a>
      </h2>
      <Table bordered hover responsive="sm">
        <caption>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="align-text-sub text-warning me-3 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          La livraison est couverte de Papara à Papenoo
        </caption>
        <thead>
          <tr>
            <th>Secteur de livraison</th>
            <th>
              Volume max. au m<sup>3</sup>
            </th>
            <th>Poids max. au kg</th>
            <th>Prix TTC</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, k) => (
            <tr key={k} className={d.sectorName === "Papeete" ? "fw-bold text-primary" : ""}>
              <td>{d.sectorName}</td>
              <td>{d.volumeMax}</td>
              <td>{d.weightMax}</td>
              <td>{`${d.price} ${d.currency}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2 id="iles" className="conthrax mt-5">
        <a href="#iles">Dans les îles</a>
      </h2>
      <Table bordered hover responsive="sm">
        <caption>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="align-text-sub text-warning me-3 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          Les prix affichés sont hors frais de port et ne concernent que le service de coursier.
        </caption>
        <thead>
          <tr>
            <th>Secteur de livraison</th>
            <th>
              Volume max. au m<sup>3</sup>
            </th>
            <th>Poids max. au kg</th>
            <th>Prix TTC</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, k) => (
            <tr key={k} className={d.sectorName === "Papeete" ? "fw-bold text-primary" : ""}>
              <td>{d.sectorName}</td>
              <td>{d.volumeMax}</td>
              <td>{d.weightMax}</td>
              <td>{`${d.price} ${d.currency}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  )
}

export default Page
