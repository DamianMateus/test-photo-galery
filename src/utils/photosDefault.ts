export const getPhotosPublicList = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

interface Gallery {
  username: string;
  photos: { [key: string]: { original: string; thumbnail: string } };
}

export const initializateGallery = (userName: string) => {
  const gallery: Gallery = { username: userName, photos: {} };

  getPhotosPublicList.forEach((photo, index) => {
    gallery.photos[index] = { original: photo.original, thumbnail: photo.thumbnail };
  });

  localStorage.setItem('gallery', JSON.stringify(gallery));
}
