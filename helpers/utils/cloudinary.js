import { v2 as _cloudinary } from 'cloudinary';
import { REGEX_CLOUDINARY_PUBLIC_ID } from '../../constants/index.js';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } =
  process.env;

_cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const { uploader } = _cloudinary;

const upload = async (
  path,
  remoteFolder,
  options = {
    folder: remoteFolder,
    use_filename: true,
  }
) => {
  const { secure_url } = await uploader.upload(path, options);
  return secure_url;
};

const destroy = async (path, options = { invalidate: true }) => {
  // берем путь к файлу в качестве id
  try {
    const [, thumbId] = path.match(REGEX_CLOUDINARY_PUBLIC_ID);
    return await uploader.destroy(thumbId, options);
  } catch {}
};

export const cloud = {
  upload,
  destroy,
};

// экспортим, если кто-то где-то юзает namespace
export const cloudinary = _cloudinary;
