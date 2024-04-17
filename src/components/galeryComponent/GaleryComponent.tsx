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

  useEffect(() => {
    initializeUsers(defaultUsers);
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
    const savedPhotos = localStorage.getItem('gallery');
    if (savedPhotos) {
      const listPhotos = JSON.parse(savedPhotos);
      setExistingPhotos(listPhotos.photos);
    } else {
      if (userNameSession) {
        initializateGallery(userNameSession.toString());
      }
      const savedPhotos = localStorage.getItem('gallery');
      const listPhotos = JSON.parse(savedPhotos || '{"photos":[]}');
      setExistingPhotos(listPhotos.photos);
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
    const lastId = existingPhotos.length > 0 ? parseInt(existingPhotos[existingPhotos.length - 1].id) + 1 : 1;

    const newPhotos = uploadedFiles.map((file, index) => ({
      id: `${lastId + index}`,
      url: URL.createObjectURL(file),
      thumbnail: URL.createObjectURL(file),
      isURL: false,
    }));
    const updatedPhotos = [...existingPhotos, ...newPhotos];
    localStorage.setItem('gallery', JSON.stringify({ photos: updatedPhotos }));
    setExistingPhotos(updatedPhotos);
  };

  const handleDeletePhoto = (id: string) => {
    const updatedPhotos = existingPhotos.filter(photo => photo.id !== id);
    localStorage.setItem('gallery', JSON.stringify({ photos: updatedPhotos }));
    setExistingPhotos(updatedPhotos);
  };


  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 sm:mb-8">Galería de Fotos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {existingPhotos.map((photo, index) => (
          <div key={index} className="p-2 relative">
            <button
              className="absolute top-0 right-0 m-1 p-1 bg-red-500 text-white rounded-full"
              style={{
                width: '20px',
                height: '20px',
                padding: '0',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
              }}
              onClick={() => handleDeletePhoto(photo.id)}
            >
              X
            </button>
            {photo.file ? (
              <img
                src={URL.createObjectURL(photo.file)}
                alt="photo file"
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                onClick={() => handleImageClick(photo.file ? URL.createObjectURL(photo.file) : photo.url!)}
              />
            ) : (
              <img
                src={photo.url}
                alt="photo thumbnail"
                style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                onClick={() => handleImageClick(photo.url ? photo.url : '')}
              />
            )}
          </div>
        ))}

      </div>
      <DropZoneArea onUpload={handleUploadPhotos} />
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
