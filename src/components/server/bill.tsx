import { join, resolve } from "path"
import { readdirSync } from "fs"
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import { BillData } from "@libs/firebase"
import { sitename } from "@libs/app"

type Props = {
  bill: BillData
}

const Bill = ({ bill }: Props) => {
  const pdfFiles = "images"
  const dir = resolve("./public", pdfFiles)
  const filenames = readdirSync(dir)
  const images = filenames.map((name) => join(dir, name))
  const headImg = images.find((img) => img.includes("server-head.png")) || ""

  const createdAt = new Date()

  return (
    <Document language="fr">
      <Page style={styles.body}>
        <View style={styles.row}>
          <View style={styles.rowCol1}>
            <Image style={styles.image} src={headImg} />
            <Text style={styles.titleHead}>{sitename}</Text>
            <View style={styles.subtitleHead}>
              <Text>N° tahiti : 919373 RCS: 091541A</Text>
              <Text>Tahiti Papeete 98714</Text>
              <Text>Polynésie Française</Text>
            </View>
          </View>
          <View style={styles.rowCol2}>
            <Text style={{ fontSize: 32, marginBottom: 5 }}>FACTURE</Text>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>{bill.billname || "#FAC-0003i"}</Text>
            <Text style={{ fontSize: 10 }}>Solde dû</Text>
            <Text>{`XPF ${bill.total}`}</Text>
          </View>
        </View>
        <View style={styles.row2}>
          <View style={styles.row2Col1}>
            <Text style={{ marginTop: 16 }}>Facturer à</Text>
            <Text>{bill.fullname}</Text>
          </View>
          <View style={styles.row2Col2}>
            <View style={styles.row2}>
              <View style={styles.row2Col2}>
                <Text style={{ marginBottom: 5 }}>Date de facture :</Text>
                <Text style={{ marginBottom: 5 }}>Conditions :</Text>
                <Text style={{ marginBottom: 5 }}>{"Date d'échéance :"}</Text>
              </View>
              <View style={styles.row2Col2}>
                <Text style={{ marginBottom: 5 }}>{createdAt.toLocaleDateString()}</Text>
                <Text style={{ marginBottom: 5 }}>Payable à réception</Text>
                <Text style={{ marginBottom: 5 }}>{createdAt.toLocaleDateString()}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.trhead}>
            <Text style={styles.th1}>#</Text>
            <Text style={styles.th2}>{"Article & Description"}</Text>
            <Text style={styles.th3}>{"Quantité"}</Text>
          </View>
          {bill.refs.map((b, k) => (
            <View style={styles.trbody} key={k}>
              <Text style={styles.td1}>{k + 1}</Text>
              <Text style={styles.td2}>{`${b.group} ${b.description}`}</Text>
              <Text style={styles.td3}>{b.size}</Text>
            </View>
          ))}
        </View>
        <View style={styles.row2}>
          <View style={styles.row2Col1}></View>
          <View style={styles.row2Col2}>
            <View style={styles.row2}>
              <View style={styles.row2Col2}>
                <Text style={{ fontSize: 16, marginTop: 20, backgroundColor: "#bdbdbd", padding: 2 }}>Total</Text>
              </View>
              <View style={styles.row2Col2}>
                <Text style={{ fontSize: 16, marginTop: 20, backgroundColor: "#bdbdbd", padding: 2 }}>{`XPF ${bill.total}`}</Text>
              </View>
            </View>
          </View>
        </View>
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
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: 32,
  },
  row2: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: 3,
    fontSize: 10,
  },
  rowCol1: {
    width: "40%",
    textAlign: "left",
  },
  rowCol2: {
    width: "60%",
    textAlign: "right",
  },
  row2Col1: {
    width: "50%",
    textAlign: "left",
  },
  row2Col2: {
    width: "50%",
    textAlign: "right",
  },
  /* row 1 */
  image: {
    width: "100%",
  },
  titleHead: {
    fontSize: 12,
  },
  subtitleHead: {
    fontSize: 10,
    color: "gray",
  },
  /* table head */
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  trhead: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    color: "white",
    backgroundColor: "black",
    fontSize: 10,
  },
  th1: {
    width: "10%",
    borderRight: 1,
    borderRightColor: "gray",
    padding: 2,
  },
  th2: {
    width: "60%",
    borderRight: 1,
    borderRightColor: "gray",
    padding: 2,
  },
  th3: {
    width: "30%",
    padding: 2,
  },
  /* table body */
  trbody: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    fontSize: 10,
  },
  td1: {
    width: "10%",
    borderTop: 1,
    borderRight: 1,
    borderRightColor: "gray",
    padding: 2,
    textAlign: "center",
  },
  td2: {
    width: "60%",
    borderTop: 1,
    borderRight: 1,
    borderRightColor: "gray",
    padding: 2,
    textAlign: "center",
  },
  td3: {
    width: "30%",
    borderTop: 1,
    borderRightColor: "gray",
    padding: 2,
    textAlign: "center",
  },
})

export default Bill
