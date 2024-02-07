'use client'

import { upload } from "@/services/s3";
import { useState } from "react";
import { message, open } from '@tauri-apps/api/dialog';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const submit = async () => {
    console.log(selectedFile);
    if (selectedFile) {
      try {
        await upload(selectedFile)
        await message('Uploaded file successfully!', { title: 'Success', type: 'info' })
      } catch (error) {
        console.error(error);
        await message('Failed to upload file!', { title: 'Error', type: 'error' })
      }
    }
  }

  return (
    <main className="flex justify-center pt-10">
      <input type="file" onChange={handleFileChange} />
      <button onClick={submit} className="bg-green-300 text-green-900 px-3 rounded">Submit</button>
    </main>
  );
}
