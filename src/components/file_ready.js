import pic from "../Media/file_ready.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const FileReady = () => {
  const addFileProfile = useSelector((state) => state.user.addFilesProfile);
  const zippedFile = addFileProfile.zip_file;
  const [zipCopy, setZipCopy] = useState(false);
  const parts = zippedFile.split("/"); // Split the URL by '/'
  const fileIdWithExtension = parts[parts.length - 1]; // Get the last part
  const fileId = fileIdWithExtension.split(".")[0];

  const handleCopyZipped = (text) => {
    setZipCopy(true);
    toast.success("Link copied!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className="bg-white px-5 pt-5 pb-10 rounded-md">
      <div className="flex justify-center">
        <img src={pic} alt="" />
      </div>
      <p className="text-xs font-medium text-center">Your file is ready</p>
      <input
        type="text"
        name=""
        id=""
        value={`https://api.transfermelon.com/fileDownload/${fileId}`}
        disabled
        className="p-4 rounded-sm text-sm md:text-xs w-full border border-[#c4c4c432] bg-[#c4c4c416] truncatem my-5"
      />
      <div className="flex justify-center">
        <button className="border px-8 py-4 text-xs rounded text-white bg-[#71cb90]">
          <CopyToClipboard
            text={`https://api.transfermelon.com/fileDownload/${fileId}`}
            onCopy={handleCopyZipped}
          >
            <span className=" cursor-pointer text-[#127ec8]">
              {zipCopy ? "Link Copied!" : "Copy link"}
            </span>
          </CopyToClipboard>
        </button>
      </div>
      <div className="grid grid-cols-2 text-xs gap-8 mt-6">
      <Link to={{ pathname: "/send_file", state: {files:fileId} }} className="text-end text-[#71cb90] underline">
  Send as email
</Link>
        <Link to={"/view_content"} className="opacity-75 underline">
          View content
        </Link>
      </div>
    </div>
  );
};

export default FileReady;
