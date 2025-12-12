import {v2 as  cloudinary} from 'cloudinary';
import { ENV } from './env.JS';

cloudinary.config({
    cloud_name:ENV.CLOUDIINARY_CLOUD_NAME,
    api_key:ENV.CLOUDINARY_API_KEY,
    api_secret:ENV.CLOUDINARY_API_SECRET
});

export default cloudinary;