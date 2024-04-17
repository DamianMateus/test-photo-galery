export type Photo = {
  id: string;
  url?: string;
  thumbnail?: string; // Agregar la propiedad thumbnail
  file?: File;
  isURL?: boolean; // Propiedad para distinguir entre fotos de URL y fotos cargadas desde archivos
};



export const getPhotosPublicList: Photo[] = [
  {
    id: '1',
    url: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    isURL: true,
  },
  {
    id: '2',
    url: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
    isURL: true,
  },
  {
    id: '3',
    url: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
    isURL: true,
  },
];

interface Gallery {
  username: string;
  photos: Photo[];
}

export const initializateGallery = (userName: string) => {
  const savedPhotos = localStorage.getItem('gallery');
  const gallery: Gallery = { username: userName, photos: [] };

  if (savedPhotos) {
    const listPhotos = JSON.parse(savedPhotos);
    gallery.photos = Object.values(listPhotos.photos);
  } else {
    getPhotosPublicList.forEach((photo, index) => {
      gallery.photos.push({ id: photo.id, url: photo.url, thumbnail: photo.thumbnail, isURL: photo.isURL });
    });
  }

  localStorage.setItem('gallery', JSON.stringify(gallery));
}