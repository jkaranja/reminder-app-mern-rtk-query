import fileDownload from "js-file-download";
import axiosPrivate from "./axiosPrivate";

const handleSingleDownload = async ({ file, token }) => {
  try {
    console.log(file);
    //console.log("Downloading...");
    const { data: note } = await axiosPrivate({ token }).post(
      `/api/download/single`,
      { filePath: file.path }
      // { responseType: "blob" }
    );

    fileDownload(note, file.filename);

    console.log("Downloaded!");
  } catch (error) {
    console.error(
      error.response?.data?.message || error.message || error.toString()
    );
  }
};

//multiple
const handleZipDownload = async ({ files, token }) => {
  const filePaths = files.map((file) => file.path);

  try {
    //console.log("Downloading...");
    const {data: note} = await axiosPrivate({ token }).post(
      `/api/download/zip`,
      { filePaths },
      { responseType: "blob" }
    );
    //FileDownload(note, "filename.zip");

    console.log("Downloaded!");
  } catch (error) {
    console.error(
      error.response?.data?.message || error.message || error.toString()
    );
  }
};

export { handleZipDownload, handleSingleDownload };
