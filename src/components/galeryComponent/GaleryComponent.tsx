'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasCookie, getCookie } from 'cookies-next';
import { initializeUsers } from '@/utils/useAuth';
import defaultUsers from '../../utils/users.json';
import DropZoneArea from './DropZoneArea';
import { initializateGallery } from '@/utils/photosDefault';

const GaleryComponent = () => {
  const router = useRouter();
  const isLoggedIn = hasCookie('isLoggedIn');
  const userNameSession = getCookie('userNameSession');
  const [photos, setPhotos] = useState<{ original: string; thumbnail: string }[]>([]);
  const [principalImage, setPrincipalImage] = useState<string | null>(null);

  useEffect(() => {
    initializeUsers(defaultUsers);
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
    const savedPhotos = localStorage.getItem('gallery');
    if (savedPhotos) {
      const listPhotos = JSON.parse(savedPhotos);
      setPhotos(Object.values(listPhotos.photos));
    } else {
      if (userNameSession) {
        initializateGallery(userNameSession.toString());
      }
      const savedPhotos = localStorage.getItem('gallery');
      const listPhotos = JSON.parse(savedPhotos ? savedPhotos : '');
      setPhotos(Object.values(listPhotos.photos));
    }
  }, [isLoggedIn, router, userNameSession]);

  console.log(photos, 'photos');

  const handleImageClick = (image: string) => {
    setPrincipalImage(image); // Setear la imagen principal al hacer clic en la miniatura
  };

  const handleCloseImage = () => {
    setPrincipalImage(null); // Cerrar la imagen principal al hacer clic en el botón de cierre
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // Si el clic ocurre en el fondo oscuro fuera de la imagen
      setPrincipalImage(null); // Cerrar la imagen principal
    }
  };

  const handleDrop = (acceptedFiles: any) => {
    // Aquí deberías procesar los archivos aceptados y guardar la información en el localStorage
    // Asegúrate de asociar las fotos al usuario actual (userNameSession)
    // Después de guardar las fotos, actualiza el estado para que se reflejen en la galería
    console.log(acceptedFiles);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Galería de Fotos</h1>
      <div className="mb-8">
        <div className="flex flex-wrap">
          {photos &&
            photos.map((photo, index) => (
              <div key={index} className="w-1/4 p-2">
                <img
                  src={photo.thumbnail}
                  alt="photo thumbnail"
                  className="cursor-pointer border border-gray-300 rounded-md"
                  onClick={() => handleImageClick(photo.original)}
                />
              </div>
            ))}
        </div>
        <DropZoneArea />
      </div>
      {principalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center" onClick={handleOutsideClick}>
          <div className="relative">
            <button
              onClick={handleCloseImage}
              className="absolute top-0 right-0 m-4 text-white cursor-pointer focus:outline-none"
            >
              Cerrar
            </button>
            <img src={principalImage} alt="principal image" className="max-w-full max-h-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleryComponent;
