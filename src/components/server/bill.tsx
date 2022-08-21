import { join, resolve } from "path"
import { readdirSync } from "fs"
import { Document, Page, Text, Link, StyleSheet, Image } from "@react-pdf/renderer"
import { BillData } from "@libs/firebase"

type Props = {
  bill: BillData
  counter: number
}

const Bill = ({ bill, counter }: Props) => {
  const pdfFiles = "images"
  const dir = resolve("./public", pdfFiles)
  const filenames = readdirSync(dir)
  const images = filenames.map((name) => join(dir, name))
  const sourceFile = images.find((img) => img.includes("couverture.png")) || ""
  return (
    <Document language="fr">
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          rao web
        </Text>
        <Image style={styles.image} src={sourceFile} />
        <Text style={styles.title}>FACTURE n°{counter || 0}</Text>
        <Text style={styles.abvsign}>{"Fait le _____________________ à _____________________ en (1) un exemplaire."}</Text>
        <Text style={styles.sign}>{"Le Concepteur                               Le Client"}</Text>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  article: {
    fontSize: 14,
    margin: 9,
    fontFamily: "Times-Bold",
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  highLight: {
    backgroundColor: "#E2F8F9",
  },
  link: {
    fontSize: 14,
    textDecoration: "none",
    fontFamily: "Times-Italic",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  abvsign: {
    marginTop: 50,
    marginBottom: 12,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  sign: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  paragraph: {
    margin: 6,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  list: {
    margin: 3,
    fontSize: 14,
    textIndent: 10,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
})

export default Bill
