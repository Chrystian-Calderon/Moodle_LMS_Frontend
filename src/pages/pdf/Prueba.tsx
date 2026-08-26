import React from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { apiService } from '@/api/api'
const Prueba = () => {
    const id: string = 'cmtaf64lk0002ssv9yvtq3lxz'

    const descargarCertificado = async () => {
        try {
            const response = await apiService.get(
                `/certificados/${id}/descargar`,
                {
                    responseType: 'blob',
                }
            )

            const url = window.URL.createObjectURL(response.data)

            const link = document.createElement('a')
            link.href = url
            link.download = 'certificado.pdf'

            document.body.appendChild(link)
            link.click()
            link.remove()

            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error al descargar:', error)
        }
    }

    return (
        <Button onClick={descargarCertificado}>
            <Download />
            Descargar certificado
        </Button>
    )
}

export default Prueba
