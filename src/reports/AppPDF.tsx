import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 20,
    textAlign: "justify",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    textAlign: "center",
  },
});

// Documento PDF
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Título centrado</Text>

      <Text style={styles.paragraph}>
        Este es un párrafo de ejemplo que aparece justo debajo del título.
        Puedes escribir aquí una introducción o descripción general del
        contenido del documento.
      </Text>

      <View style={styles.table}>
        {/* Fila encabezado */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Columna 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Columna 2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Columna 3</Text>
          </View>
        </View>

        {/* Fila 1 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Dato 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Dato 2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Dato 3</Text>
          </View>
        </View>

        {/* Fila 2 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Dato A</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Dato B</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Dato C</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

// Componente principal
const AppPDF = () => (
  <div>
    <h1>Visualización y descarga de PDF</h1>

    <h2>Visualizador:</h2>
    <PDFViewer width="100%" height="600">
      <MyDocument />
    </PDFViewer>

    <h2>Descargar PDF:</h2>
    <PDFDownloadLink
      document={<MyDocument />}
      fileName="mi-documento.pdf"
      style={{
        textDecoration: "none",
        padding: "10px",
        color: "#fff",
        backgroundColor: "#007bff",
        borderRadius: 4,
      }}
    >
      {({ loading }) => (loading ? "Generando..." : "Descargar PDF")}
    </PDFDownloadLink>
  </div>
);

export default AppPDF;
