import { useAtom } from "jotai";
import React, { useState } from "react";
import { uploadManagerAtom } from "~/atoms/uploadManager.atom";
import type { FileUploading } from "~/atoms/uploadManager.atom";
import { nanoid } from "nanoid";
import { getTempBucketImageLink } from "~/config";
import { uploadEndpoint } from "~/endpoints/upload.endpoint";
import axios from "axios";
import UploadMultipleFile from "~/components/upload/UploadMultipleFile";
import type { CustomImage } from "~/components/upload/types";

const HomePage = () => {
  const [uploadingImages, setUploadingImages] = useState<File[]>([]);
  const [uploadManager, updateUploadManager] = useAtom(uploadManagerAtom);

  const uploadedImages: string[] = [];
  uploadingImages.forEach((img) => {
    const found = uploadManager.find((u) => u.originalName === img.name);
    if (found?.status === "success") {
      uploadedImages.push(found?.destinationUrl);
    }
  });

  const handleUpdateFileUploading = (fUploading: FileUploading) => {
    updateUploadManager((cur) => {
      const isExist = cur.some((f) => f.fileName === fUploading.fileName);
      let newCur = [...cur];
      if (isExist) {
        newCur = newCur.map((f) => {
          if (f.fileName === fUploading.fileName) return fUploading;
          return f;
        });
      } else {
        newCur = newCur.concat(fUploading);
      }
      return newCur;
    });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const needUploadImages = acceptedFiles.filter((af) => {
      const currentUploadingImage = uploadingImages.find((ui) => {
        if (typeof ui === "string") return false;
        return ui.name === af.name;
      });
      return !currentUploadingImage;
    });

    // update current uploading images
    const newImages = uploadingImages.concat(needUploadImages);
    // show preview uploading images
    setUploadingImages(newImages);

    // start upload image to storage
    needUploadImages.forEach((file) => {
      if (typeof file !== "string") {
        const fileName = `${nanoid()}-${file.name}`;
        const destinationUrl = getTempBucketImageLink(fileName);

        uploadEndpoint.getUploadUrl(fileName, file.type).then((response) => {
          const signedUrl = response.data;
          const fUploading: FileUploading = {
            fileName,
            originalName: file.name,
            startTime: Date.now(),
            filePreview: URL.createObjectURL(file),
            signedUrl,
            status: "uploading",
            uploadingProgress: 0,
            destinationUrl,
          };
          handleUpdateFileUploading(fUploading);
          axios
            .put(signedUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
              onUploadProgress: function (progressEvent) {
                let percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                fUploading.uploadingProgress = percentCompleted;
                handleUpdateFileUploading(fUploading);
              },
            })
            .then(() => {
              fUploading.status = "success";
              handleUpdateFileUploading(fUploading);
            })
            .catch(() => {
              fUploading.status = "error";
              handleUpdateFileUploading(fUploading);
            });
        });
      }
    });
  };

  const handleRemove = (file: CustomImage) => {
    const filteredItems = uploadingImages?.filter((_file) => _file !== file);
    setUploadingImages(filteredItems);
  };

  return (
    <div className="container mx-auto p-4">
      <UploadMultipleFile
        onRemove={handleRemove}
        files={uploadingImages}
        onDrop={handleDrop}
      />
    </div>
  );
};

export default HomePage;
