import { Storage } from "@google-cloud/storage";
import { GCS_CLIENT_EMAIL, GCS_PRIVATE_KEY, GCS_PROJECT_ID } from "~/config";

export const storage = new Storage({
  projectId: GCS_PROJECT_ID,
  credentials: {
    client_email: GCS_CLIENT_EMAIL,
    private_key: GCS_PRIVATE_KEY,
  },
});
