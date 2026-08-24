import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#F5F1E8",
        padding: 30,
    },

    certificate: {
        flex: 1,
        border: "3px solid #B08D32",
        padding: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        fontSize: 14,
        letterSpacing: 4,
        color: "#B08D32",
        marginBottom: 25,
    },

    title: {
        fontSize: 34,
        fontWeight: "bold",
        letterSpacing: 5,
        color: "#222222",
    },

    subtitle: {
        fontSize: 14,
        letterSpacing: 3,
        color: "#777777",
        marginTop: 8,
        marginBottom: 35,
    },

    text: {
        fontSize: 12,
        color: "#555555",
    },

    name: {
        fontSize: 30,
        color: "#B08D32",
        marginTop: 15,
        marginBottom: 20,
    },

    courseText: {
        fontSize: 12,
        color: "#555555",
        marginBottom: 10,
    },

    course: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222222",
        marginBottom: 12,
    },

    hours: {
        fontSize: 11,
        color: "#777777",
    },

    signatures: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "75%",
        marginTop: 55,
    },

    signature: {
        width: 140,
        alignItems: "center",
    },

    line: {
        width: 130,
        borderTop: "1px solid #333333",
        marginBottom: 6,
    },

    signatureName: {
        fontSize: 10,
        color: "#333333",
    },

    signatureRole: {
        fontSize: 8,
        color: "#777777",
        marginTop: 3,
    },

    footer: {
        position: "absolute",
        bottom: 25,
        fontSize: 8,
        color: "#888888",
    },
});

export default function Certificado() {
    return (
        <Document>
            <Page
                size="A4"
                orientation="landscape"
                style={styles.page}
            >
                <View style={styles.certificate}>

                    <Text style={styles.logo}>
                        MI EMPRESA
                    </Text>

                    <Text style={styles.title}>
                        CERTIFICADO
                    </Text>

                    <Text style={styles.subtitle}>
                        DE FINALIZACIÓN
                    </Text>

                    <Text style={styles.text}>
                        Se certifica que
                    </Text>

                    <Text style={styles.name}>
                        JUAN PÉREZ
                    </Text>

                    <Text style={styles.courseText}>
                        ha completado satisfactoriamente el curso
                    </Text>

                    <Text style={styles.course}>
                        DESARROLLO WEB CON REACT
                    </Text>

                    <Text style={styles.hours}>
                        Con una duración de 120 horas académicas
                    </Text>

                    <View style={styles.signatures}>

                        <View style={styles.signature}>
                            <View style={styles.line} />

                            <Text style={styles.signatureName}>
                                Juan Gómez
                            </Text>

                            <Text style={styles.signatureRole}>
                                Instructor
                            </Text>
                        </View>

                        <View style={styles.signature}>
                            <View style={styles.line} />

                            <Text style={styles.signatureName}>
                                María López
                            </Text>

                            <Text style={styles.signatureRole}>
                                Directora Académica
                            </Text>
                        </View>

                    </View>

                    <Text style={styles.footer}>
                        CERT-2026-001 • 24 DE AGOSTO DE 2026
                    </Text>

                </View>
            </Page>
        </Document>
    );
}