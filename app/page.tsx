'use client'

import { upload } from "@/services/s3";
import { message } from '@tauri-apps/api/dialog';
import { useState } from "react";

export default function Home() {
  const [bucketName, setBucketName] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [accessKeyId, setAccessKeyId] = useState<string>('');
  const [secretAccessKey, setSecretAccessKey] = useState<string>('');
  const [useLocalStack, setUseLocalStack] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTextChange = (event: any, setState: (value: any) => any) => {
    setState(event.target.value as string);
  };

  const handleCheckboxChange = (event: any, setState: (value: any) => any) => {
    setState(event.target.checked as boolean);
  };

  const submit = async () => {
    console.log(selectedFile);
    if (selectedFile) {
      try {
        await upload(selectedFile, {
          bucketName,
          useLocalStack,
          region,
          accessKeyId,
          secretAccessKey
        })
        await message('Uploaded file successfully!', { title: 'Success', type: 'info' })
      } catch (error) {
        console.error(error);
        await message(`Failed to upload file!\n\n${error}`, { title: 'Error', type: 'error' })
      }
    }
  }

  return (
    <main className="flex flex-col pt-5 px-10 gap-1">
      <label htmlFor="" className="font-semibold">AWS Client Configuration</label>
      <div className="flex gap-1 flex-wrap">
        <input type="text" className="rounded border-2 py-1 px-3 flex-grow" placeholder="Bucket Name" value={bucketName} onChange={e => handleTextChange(e, setBucketName)} />
        <input type="text" className="rounded border-2 py-1 px-3 flex-grow" placeholder="Region" value={region} onChange={e => handleTextChange(e, setRegion)} />
      </div>
      <div className="flex gap-1 flex-wrap">
        <input type="text" className="rounded border-2 py-1 px-3 flex-grow" placeholder="Access Key ID" value={accessKeyId} onChange={e => handleTextChange(e, setAccessKeyId)} />
        <input type="text" className="rounded border-2 py-1 px-3 flex-grow" placeholder="Secret Access Key" value={secretAccessKey} onChange={e => handleTextChange(e, setSecretAccessKey)} />
      </div>
      <div className="flex gap-1 flex-wrap">
        <input type="checkbox" className="rounded border-2 py-1 px-3" placeholder="Secret Access Key" checked={useLocalStack} onChange={e => handleCheckboxChange(e, setUseLocalStack)} />
        <label htmlFor="">Use LocalStack</label>
      </div>
      <hr className="my-3" />
      <label htmlFor="" className="font-semibold">AWS S3 Upload</label>
      <input type="file" onChange={handleFileChange} />
      <button onClick={submit} className="bg-emerald-300 text-emerald-900 px-3 py-1 rounded">Upload</button>
    </main>
  );
}
