import { Table } from "react-bootstrap"

const MyTable = () => {
  return (
    <Table responsive="sm" className="mt-5">
      <thead>
        <tr>
          <th>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              />
            </svg>
          </th>
          <th>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a href="tel:+689323795" className="link-info">{"+68987323795".replace("+689", "")}</a>
          </td>
          <td>{"Tetuaoro"}</td>
        </tr>
      </tbody>
    </Table>
  )
}

const Component = () => {
  return (
    <main className="w-100 min-vh-100 p-3 p-sm-4 bg-gray-300">
      <h1>Facture/Devis</h1>
      <MyTable />
    </main>
  )
}

export default Component
