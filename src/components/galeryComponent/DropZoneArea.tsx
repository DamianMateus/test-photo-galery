import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

const DropZoneArea = ({ onUpload }: { onUpload: (files: File[]) => void }) => {
  const [files, setFiles] = useState<File[]>([]); // Estado para almacenar los archivos seleccionados

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    onUpload(files);
    setFiles([]);
  };

  return (
    <div>
      <div {...getRootProps()} className="mb-4">
        <input {...getInputProps()} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Subir Fotos
        </button>
      </div>
      {files.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Archivos seleccionados:</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleUpload}
          >
            Subir Archivos
          </button>
        </div>
      )}
    </div>
  );
};

export default DropZoneArea;
