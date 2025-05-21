import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"  // firebase storage 関数　import
//ref: Firebase의 저장소 경로를 설정. 폴더 경로처럼 "images/myimage.jpg" 
//uploadBytes: Firebase의 저장소에 파일을 업로드. 이 함수는 파일을 업로드하고, 업로드된 파일의 참조를 반환
//getDownloadURL: Firebase의 저장소에 업로드된 파일의 다운로드 URL을 가져옵니다. 이 URL은 파일을 다운로드하거나 미리보기하는 데 사용
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";



export default function UploadPhoto() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState("");

    const handleUpload = async()=>{
        if(!file) return alert("Please select a file");
       
        try{
            const uniqueFileName = `${uuidv4()}_${file.name}`;
            const storageRef = ref(storage, `images/${uniqueFileName}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setUrl(downloadURL);
            alert("File uploaded successfully");
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
        </div>
      );

}