import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "./../assets/images/almacenlite.png";

// Estilos
const styles = StyleSheet.create({
  page: {
    padding: "40px",
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f4f4f9",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 24,
    color: "#0044cc",
    fontWeight: "bold",
  },
  logo: {
    width: 60,
    height: 60,
    margin: "0 auto 20px",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 20,
    color: "#333",
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  paragraph: {
    marginBottom: 20,
    textAlign: "justify",
    fontSize: 12,
    color: "#444",
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    padding: "8px",
    borderStyle: "solid",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  tableCell: {
    textAlign: "center",
    fontSize: 12,
    color: "#333",
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#999",
    marginTop: 40,
  },
});

// Documento PDF
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          //src="https://about.udemy.com/wp-content/uploads/2017/10/NewUlogo-large-1.png"
          src={logo}
          style={styles.logo}
        />
        <Text>Almacen Lite</Text>
      </View>

      {/* Title Section */}
      <Text style={styles.title}>Explorando Diseño Creativo en React</Text>

      {/* Subtitle and Paragraph */}
      <Text style={styles.subtitle}>Un enfoque innovador para crear PDFs</Text>
      <Text style={styles.paragraph}>
        Este documento demuestra cómo podemos crear PDFs visualmente atractivos
        utilizando React y la librería `@react-pdf/renderer`. Aprenderás cómo
        estructurar contenido dinámico, agregar tablas, y personalizar estilos
        para crear documentos profesionales y elegantes. ¡Todo directamente
        desde tu aplicación React!
      </Text>

      {/* Table Section */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Nombre</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Edad</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Ciudad</Text>
          </View>
        </View>

        {/* Table Row 1 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Juan</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>29</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Madrid</Text>
          </View>
        </View>

        {/* Table Row 2 */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>María</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>34</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Barcelona</Text>
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <Text style={styles.footer}>
        Generado por @react-pdf/renderer | © 2025
      </Text>
    </Page>
  </Document>
);

// Componente Principal
const AppPDF = () => (
  <div>
    <PDFViewer width="100%" height="735">
      <MyDocument />
    </PDFViewer>
  </div>
);

export default AppPDF;
