// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TEMP_GCS_BUCKET } from "~/config";
import { storage } from "~/utils/gcs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const type = req.query.type as string
  const fileName = req.query.fileName as string

  const bucketName = TEMP_GCS_BUCKET;

  // Get a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(bucketName)
    .file(`${fileName}`)
    .getSignedUrl({
      expires: Date.now() + 1 * 60 * 1000, //  1 minute,
      contentType: type,
      version: "v4",
      action: "write",
    });

  res.status(200).json(url);
}
