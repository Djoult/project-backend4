export const JIMP_SUPPORTED_FORMATS = ['jpeg', 'png', 'bmp', 'tiff', 'gif'];

export const JIMP_SUPPORTED_MIMETYPES = JIMP_SUPPORTED_FORMATS.map(
  format => `image/${format}`
);

export const JIMP_SUPPORTED_EXTNAMES = [
  ...JIMP_SUPPORTED_FORMATS,
  'jpg',
  'tif',
];
