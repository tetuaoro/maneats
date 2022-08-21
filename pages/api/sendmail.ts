import { renderToStream } from "@react-pdf/renderer"
import { createTransport } from "nodemailer"
import { email } from "@libs/app"
import { getBill, getBillCounter } from "@libs/firebase"
import Bill from "@components/server/bill"

import type { NextApiRequest, NextApiResponse } from "next"
import type { Options, SentMessageInfo } from "nodemailer/lib/smtp-transport"
import { logger, getFormatedFilenameDate } from "@libs/helpers"

const from = "noreply@rao-nagos.pf"
const mailConfig: Options = {
  host: "box.rao-nagos.pf",
  port: 465,
  secure: true,
  auth: {
    user: from,
    pass: process.env["NOREPLY_PASSWORD"] || "",
  },
}
const transporter = createTransport(mailConfig)
const message = "Ci-joint le devis estimé ! Si vous avez soumis une demande de service, Manea tahiti services doit encore confirmer le devis."

type BodyResponseType = {
  email: string
  id: string
  all: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader("Content-Type", "text/plain")

    const { email: emailClient, id, all } = req.body as BodyResponseType

    const callBackTransporter = (error: Error | null, info: SentMessageInfo) => {
      if (error) {
        logger("transporter logger error", error)
        res.status(500).send("Something happened when sending message !\r\n")
      } else {
        logger("transporter logger info", info)
        res.status(200).send(`mail sent to ${emailClient}\r\n`)
      }
    }

    try {
      const [bill, counter] = await Promise.all([getBill(id), getBillCounter()])
      const content = (await renderToStream(Bill({ bill, counter }))) as any
      transporter.sendMail(
        {
          from: `Do not Reply <${from}>`,
          to: all ? [emailClient, "tetuaoropro@gmail.com"] : emailClient,
          subject: "Devis estimé de Manea tahiti services",
          text: message,
          html: `<p>${message}</p>`,
          attachments: [
            {
              filename: `devis_maneats_${getFormatedFilenameDate()}`,
              content,
              contentType: "application/pdf",
            },
          ],
        },
        callBackTransporter
      )
    } catch (error) {
      logger("err", error)
      res.status(500).send("Something broken !\r\n")
    }
  } catch (error) {}
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default handler
