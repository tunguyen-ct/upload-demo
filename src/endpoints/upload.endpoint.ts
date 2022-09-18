import axios from "axios";

const getUploadUrl = (fileName: string, fileType: string) => {
  return axios.get(`/api/upload-url`, {
    params: {
      type: fileType,
      fileName,
    },
  });
};

export const uploadEndpoint = {
  getUploadUrl
};
