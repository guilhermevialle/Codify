import { IpcRenderer, ipcRenderer } from 'electron'
import { useState } from 'react'

export default function Songs() {
  const [selectedFile, setSelectedFile] = useState(null)

  function openFileDialog() {
    ipcRenderer.send('open-file-dialog', [
      { name: 'Arquivos de Música', extensions: ['mp3', 'wav'] }
    ])
  }

  function handleFileSelected(event) {
    setSelectedFile(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <div>
      <button onClick={openFileDialog}>Selecionar Arquivo</button>
      {selectedFile && (
        <audio controls>
          <source src={selectedFile} type="audio/mpeg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
      )}
    </div>
  )
}
