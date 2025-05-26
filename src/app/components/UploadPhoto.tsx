import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"  // firebase storage 関数
//ref: 保存するパスを指定（例: "images/myphoto.jpg"）
//uploadBytes: 指定した場所にファイルをアップロード
//getDownloadURL: アップロードされたファイルのURLを取得（ダウンロードやプレビューに使用）


export default function UploadPhoto() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState("");

    const handleUpload = async()=>{
      setUploading(true);
        if(!file) return alert("Please select a file");
       
        try{
            const uniqueFileName = `${uuidv4()}_${file.name}`;
            const storageRef = ref(storage, `images/${uniqueFileName}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setUrl(downloadURL);
            alert("File uploaded successfully");
            setFile(null);
        }catch(error){
            console.error("Error uploading file:", error);
            alert("Error uploading file");
        }finally{
            setUploading(false);
        }
    }


    return (
        <div >
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
          />
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? "uploading" : "upload"}
          </button>
          {url && (
            <div>
              <p>image:</p>
              <img src={url} alt="upload_img" />
            </div>
          )}
          {file && (
            <div>
              <p>preview :</p>
              <img src={URL.createObjectURL(file)} alt="preview_img" width={200} />
            </div>
          )}
        </div>
      );

}