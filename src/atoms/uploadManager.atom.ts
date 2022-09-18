import { atom } from 'jotai'

export type FileUploading = {
  signedUrl: string
  fileName: string
  originalName: string
  filePreview: any
  uploadingProgress: any
  startTime: number
  status: "success" | "uploading" | "error",
  destinationUrl: string
}

export const uploadManagerAtom = atom<FileUploading[]>([])