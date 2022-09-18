import { memo } from "react";
import FilePreviewItem from "./FilePreviewItem";
import { UploadMultiFileProps } from "./types";

const MultiFilePreview = ({
  files,
  onRemove,
}: UploadMultiFileProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
        {files.map((file) => {
          const key = typeof file === "string" ? file : file.name;
          return (
            <FilePreviewItem
              key={key}
              file={file}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(MultiFilePreview);
