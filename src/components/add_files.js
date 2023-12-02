import containerImg from "../Media/container.svg";
import remove from "../Media/delete.svg";
import React, { useState, useRef } from "react";
import { CircularProgress } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { addFiles } from "../data/local/reducers/user.reducer";



const AddFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showFileSelector, setShowFileSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle file selection
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = files.map((file, index) => {
      // Rename each file as "image_{index + 1}"
      file.displayName = `image_${index + 1}`;
      return file;
    });
    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  // remove a selected file
  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleGetLink = async() => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image_count', selectedFiles.length);
    selectedFiles.forEach((file, index) => {
      formData.append(`image_${index + 1}`, file);
    });
    const { payload } = await dispatch(addFiles(formData));
    console.log(payload);
    
    if (payload.status_code === "0" ) {
      navigate("file_ready");
    }
  };

  return (
    <div className="bg-white h-full overflow-y-scroll rounded-md text-sm">
      {loading ? (
        <div className="text-center py-4">
          <div className="items-end px-5 pt-8 pb-4 sticky top-0 bg-white shadow-sm">
            <p className="text-semibold">Add files.</p>
            <p className="text-xs opacity-60">
              you can only send up to 2GB at a time
            </p>
          </div>
          <div className="text-center py-4">
            <CircularProgress color="secondary" />
          </div>
        </div>
      ) : (
        <div>
          <div className="items-end px-5 pt-8 pb-4 sticky top-0 bg-white shadow-sm">
            <p className="text-semibold">Add files.</p>
            <p className="text-xs opacity-60">
              you can only send up to 2GB at a time
            </p>
          </div>
          {!showFileSelector ? (
            <button onClick={() => setShowFileSelector(true)} className="w-full">
              <div className="text-xs text-center grid px-5 py-20">
                <img
                  src={containerImg}
                  alt=""
                  className="justify-self-center mb-3"
                />
                <p className="opacity-50">You haven't uploaded any files yet</p>
                <p className="opacity-50">Click to begin</p>
              </div>
            </button>
          ) : (
            <div>
              {selectedFiles.length > 0 && (
                <div className="text-sm grid px-5 py-8">
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="text-xs mb-5">
                        <div className="grid grid-cols-6">
                          <div className="col-span-5 truncate">{file.name}</div>
                          <button
                            className="justify-self-end"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <img src={remove} alt="" />
                          </button>
                        </div>
                        <div className="text-gray-400">
                          <p className="font-medium">
                            {(file.size / (1024 * 1024)).toFixed(2)} mb
                          </p>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              )}
  
              <div className="px-5">
                {selectedFiles.length > 0 ? (
                  <button
                    onClick={handleFileSelect}
                    className="border w-full py-4 mb-8 text-xs rounded border-[#71CB90] text-[#71CB90] flex justify-center items-center gap-4 hover:bg-[#71CB9024]"
                  >
                    <span>add more files</span>
                  </button>
                ) : (
                  <div className="py-24">
                    <button
                      onClick={handleFileSelect}
                      className="border w-full py-4 text-xs rounded border-[#71CB90] text-[#71CB90] hover-bg-[#71CB9024]"
                    >
                      Select files
                    </button>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf, .doc, .docx, .txt"
                multiple
                onChange={handleFileInputChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <div
                className={
                  selectedFiles.length > 0
                    ? "bg-[#F4FBF7] p-5 border-t sticky bottom-0"
                    : "hidden"
                }
              >
                <button
                  onClick={handleGetLink}
                  className="bg-[#71CB90] text-white w-full py-4 text-xs font-semibold rounded"
                >
                  Get a link
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
};

export default AddFiles;
