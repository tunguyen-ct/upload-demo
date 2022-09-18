import React, { memo, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/future/image";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { FileUploading, uploadManagerAtom } from "~/atoms/uploadManager.atom";

const getImageData = (uploadManager: FileUploading[], file: File | string) => {
  if (typeof file === "string") {
    return {
      preview: file,
      uploadPercent: 100,
      status: "success",
    };
  } else {
    const uf = uploadManager.find((fu) => fu.originalName === file.name);
    return {
      preview: uf?.filePreview,
      uploadPercent: uf?.uploadingProgress,
      status: uf?.status,
    };
  }
};

const FilePreviewItem = ({
  file,
  onRemove,
}: {
  file: File | string;
  onRemove: (f: File | string) => void;
}) => {
  const uploadManager = useAtomValue(uploadManagerAtom);
  const { preview, uploadPercent, status } = getImageData(uploadManager, file);

  const [hideProgress, setHideProgress] = useState(false);

  useEffect(() => {
    if (uploadPercent === 100) {
      setTimeout(() => {
        setHideProgress(true);
      }, 1000);
    }
  }, [uploadPercent]);

  const shouldHideProgress = !hideProgress && typeof file !== "string";

  const handleRemove = () => {
    onRemove(file);
  };

  return (
    <div className={clsx("relative bg-neutral-600 rounded overflow-hidden")}>
      <div className="aspect-w-4 aspect-h-3 rounded bg-neutral-600">
        {typeof preview === "string" && (
          <Image
            alt="preview-img"
            fill
            src={preview as string}
            className="object-cover rounded"
            sizes="50vw"
          />
        )}
      </div>
      <button
        onClick={handleRemove}
        className="w-6 h-6 bg-black bg-opacity-70 hover:bg-opacity-90 absolute top-1 right-1 z-10 rounded-full"
      >
        <XMarkIcon className="w-6 h-6 text-gray-100" />
      </button>
      {status !== "success" && (
        <div className="absolute inset-0 bg-white opacity-60" />
      )}
      {status === "error" && (
        <div className="h-1 rounded-full absolute bottom-0 left-0 w-full opacity-80">
          <div className="h-1 relative bg-white overflow-hidden">
            <div className="h-1 bg-red-500 w-full absolute bottom-0 left-0 transition-all" />
          </div>
        </div>
      )}
      {shouldHideProgress && (
        <div className="h-1 rounded-full absolute bottom-0 left-0 w-full opacity-80">
          <div className="h-1 relative bg-white overflow-hidden">
            <div
              style={{ width: `${uploadPercent}%` }}
              className="h-1 bg-green-500 absolute bottom-0 left-0 transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(FilePreviewItem);
