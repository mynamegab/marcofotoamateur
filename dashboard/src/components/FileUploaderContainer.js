import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];

export const FileUploaderContainer = ({ albumId, uploadPicturesCallback }) => {
  // Files isn't an array
  const [files, setFiles] = useState([]);

  return (
    <div className="file-uploader">
      <h4>Add new pictures</h4>
      <FileUploader
        multiple={true}
        maxSize={20}
        handleChange={_files => {
          const fileWrappers = [];
          for (let i = 0; i < _files.length; i++) {
            fileWrappers.push(_files.item(i));
          }

          setFiles(fileWrappers);
        }}
        name="file"
        types={fileTypes}
      />

      <div>
        {
          files.map((file, i) => (
            <div
              key={i}
              style={{fontSize: '0.8em'}}
            >
              {file.name}
            </div>
          ))
        }
      </div>

      <br />
      <button
        disabled={!files.length}
        onClick={async () => {
          uploadPicturesCallback([...files]);
          setFiles([])
        }}
      >
        Upload {files.length} pictures
      </button>
    </div>
  );
}
