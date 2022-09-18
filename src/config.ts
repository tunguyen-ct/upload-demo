export const TEMP_GCS_BUCKET = process.env.NEXT_PUBLIC_TEMP_GCS_BUCKET ?? ""; // e.g. "bucket-temp"
export const GCS_PROJECT_ID = process.env.GCS_PROJECT_ID ?? ""; // e.g. "project-test-321215"
export const GCS_CLIENT_EMAIL = process.env.GCS_CLIENT_EMAIL ?? ""; // e.g. "test-email@project-test-321215.iam.gserviceaccount.com"
export const GCS_PRIVATE_KEY = process.env.GCS_PRIVATE_KEY ?? ""; // e.g. "-----BEGIN PRIVATE KEY-----\nMIIEvQI\n-----END PRIVATE KEY-----\n"

export const getTempBucketImageLink = (fileName: string) => {
  return `https://storage.googleapis.com/${TEMP_GCS_BUCKET}/${fileName}`;
};
