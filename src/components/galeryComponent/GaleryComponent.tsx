'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasCookie, getCookie } from 'cookies-next';
import { initializeUsers } from '@/utils/useAuth';
import defaultUsers from '../../utils/users.json';
import DropZoneArea from './DropZoneArea';
import { initializateGallery, Photo } from '@/utils/photosDefault';

const GaleryComponent = () => {
  const router = useRouter();
  const isLoggedIn = hasCookie('isLoggedIn');
  const userNameSession = getCookie('userNameSession');
  const [existingPhotos, setExistingPhotos] = useState<Photo[]>([]);
  const [principalImage, setPrincipalImage] = useState<string | File | null>(null);


  // Cargar las fotos existentes del localStorage al montar el componente
  useEffect(() => {
    initializeUsers(defaultUsers);
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
    const savedPhotos = localStorage.getItem('gallery');
    if (savedPhotos) {
      const listPhotos = JSON.parse(savedPhotos);
      setExistingPhotos(Object.values(listPhotos.photos));
    } else {
      if (userNameSession) {
        initializateGallery(userNameSession.toString());
      }
      const savedPhotos = localStorage.getItem('gallery');
      const listPhotos = JSON.parse(savedPhotos ? savedPhotos : '');
      setExistingPhotos(Object.values(listPhotos.photos));
    }
  }, [isLoggedIn, router, userNameSession]);

  const handleImageClick = (image: string) => {
    setPrincipalImage(image);
  };

  const handleCloseImage = () => {
    setPrincipalImage(null);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setPrincipalImage(null);
    }
  };

  const handleUploadPhotos = (uploadedFiles: File[]) => {
    const newPhotos = uploadedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      thumbnail: URL.createObjectURL(file),
      isURL: false,
    }));

    const savedPhotos = localStorage.getItem('gallery');
    let listPhotos = savedPhotos ? JSON.parse(savedPhotos) : { photos: [] };

    if (!Array.isArray(listPhotos.photos)) {
      listPhotos = { photos: [] };
    }

    const updatedPhotos = [...listPhotos.photos, ...newPhotos];
    localStorage.setItem('gallery', JSON.stringify({ photos: updatedPhotos }));
    setExistingPhotos(updatedPhotos);
  };


  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 sm:mb-8">Galería de Fotos</h1>
      <div className="mb-8 overflow-x-auto">
        <div className="flex flex-nowrap">

          {existingPhotos.map((photo, index) => (
            <div key={index} className="p-2">
              {photo.file ? ( 
                <img
                  src={URL.createObjectURL(photo.file)}
                  alt="photo file"
                  className="cursor-pointer border border-gray-300 rounded-md min-w-150 sm:min-w-100"
                  onClick={() => handleImageClick(photo.file ? URL.createObjectURL(photo.file) : photo.url!)}
                />
              ) : (
                <img
                  src={photo.url}
                  alt="photo thumbnail"
                  className="cursor-pointer border border-gray-300 rounded-md min-w-150 sm:min-w-100"
                    onClick={() => handleImageClick(photo.url ? photo.url : '')}
                />
              )}
            </div>
          ))}

        </div>
        <DropZoneArea onUpload={handleUploadPhotos} />
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
            <img
              src={typeof principalImage === 'string' ? principalImage : URL.createObjectURL(principalImage)}
              alt="principal image"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleryComponent;
