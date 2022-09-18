import type { DropzoneOptions } from "react-dropzone";

export interface UploadMultiFileProps extends DropzoneOptions {
  files: (File | string)[];
  onRemove: (file: File | string) => void;
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  uploadPercent?: number;
}

export type CustomImage = string | CustomFile;
