import { generateReactHelpers } from "@uploadthing/react";
import { generateUploadDropzone } from "@uploadthing/react";


export const { useUploadThing, uploadFiles } =
  generateReactHelpers();

export const UploadButton = generateUploadDropzone();
export const UploadDropzone = generateUploadDropzone();
