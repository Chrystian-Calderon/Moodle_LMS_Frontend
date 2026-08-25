import {
    PDFDownloadLink,
    PDFViewer,
} from "@react-pdf/renderer";

import Certificado from "@/features/Pdf/Components/pdfDiploma";

export default function PdfPage() {
    return (
        <div className="w-full h-screen flex flex-col">

            <div className="flex-1">
                <PDFViewer
                    width="100%"
                    height="100%"
                >
                    <Certificado />
                </PDFViewer>
            </div>

            <div className="p-4 flex justify-center">
                <PDFDownloadLink
                    document={<Certificado />}
                    fileName="certificado.pdf"
                >
                    {({ loading }) =>
                        loading
                            ? "Generando certificado..."
                            : "Descargar certificado"
                    }
                </PDFDownloadLink>
            </div>

        </div>
    );
}