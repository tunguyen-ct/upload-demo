import React from "react";
import { useDropzone } from "react-dropzone";
import MultiFilePreview from "./MultiFilePreview";
import { UploadMultiFileProps } from "./types";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

const UploadMultipleFile = ({
  onDrop,
  files,
  onRemove,
}: UploadMultiFileProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="bg-neutral-200 mb-2 p-10 border border-neutral-400 rounded border-dashed hover:opacity-75 hover:cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="flex justify-center items-center gap-3">
          <div>
            <CloudArrowUpIcon className="w-10 h-10" />
          </div>
          <div>
            <div className="font-bold">Drop or Select file</div>
            <div className="text-xs">
              Drop files here or click&nbsp;
              <span className="text-green-500 underline">browse</span>
              &nbsp;thorough your machine
            </div>
          </div>
        </div>
      </div>
      <MultiFilePreview onRemove={onRemove} files={files} />
    </div>
  );
};

export default UploadMultipleFile;
