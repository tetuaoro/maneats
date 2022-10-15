import { Alert } from "react-bootstrap"
import { exploitableAdData } from "@libs/helpers"

type Props = {
  ad: ReturnType<typeof exploitableAdData> | null
}
const Component = ({ ad }: Props) => {
  if (!ad || !ad.message || ad.message.length < 3) return <></>
  return (
    <Alert variant="info" className="py-2">
      <p>
        <span className="fs-5">{ad.title}</span>
        <br />
        {ad.message}
      </p>
    </Alert>
  )
}

export default Component
