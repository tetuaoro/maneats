import { renderToStream } from "@react-pdf/renderer"
import { createTransport } from "nodemailer"
import Bill from "@components/server/bill"
import { email } from "@libs/app"
import { logger, getFormatedFilenameDate } from "@libs/helpers"

import type { BillData } from "@libs/firebase"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Options, SentMessageInfo } from "nodemailer/lib/smtp-transport"

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
const message = "Ci-joint le devis estimé ! Si vous avez soumis une demande de service, Manea tahiti services doit encore confirmer le devis et vous contactera dans les plus bref délais."

type BodyResponseType = {
  email: string
  bill: BillData
  sendbill: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader("Content-Type", "text/plain")

    const { email: emailClient, bill, sendbill } = req.body as BodyResponseType

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
      const content = (await renderToStream(Bill({ bill }))) as any

      let mailOptions: any = {
        from: `Do not Reply <${from}>`,
        to: `"${bill.fullname}" <${emailClient}>`,
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
      }

      if (sendbill) mailOptions["bcc"] = `"Pro ça" <${email}>`

      transporter.sendMail(mailOptions, callBackTransporter)
    } catch (error) {
      logger("err", error)
      res.status(500).send("Something broken [003] !\r\n")
    }
  } catch (error) {
    logger("err", error)
    res.status(500).send("Something broken [004] !\r\n")
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default handler
