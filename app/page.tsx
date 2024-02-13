'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
    setState(event as boolean);
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
    <main className="flex flex-col py-5 px-10 gap-2">
      <label htmlFor="" className="font-semibold">AWS Client Configuration</label>
      <div className="flex gap-1 flex-wrap">
        <Input placeholder="Bucket Name" value={bucketName} onChange={e => handleTextChange(e, setBucketName)} />
        <Input placeholder="Region" value={region} onChange={e => handleTextChange(e, setRegion)} />
        <Input placeholder="Access Key ID" value={accessKeyId} onChange={e => handleTextChange(e, setAccessKeyId)} />
        <Input placeholder="Secret Access Key" value={secretAccessKey} onChange={e => handleTextChange(e, setSecretAccessKey)} />
      </div>
      <div className="flex gap-1 flex-wrap items-center">
        <Checkbox id="chkBoxUseLocalStack" checked={useLocalStack} onCheckedChange={e => handleCheckboxChange(e, setUseLocalStack)} />
        <label htmlFor="chkBoxUseLocalStack" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Use LocalStack</label>
      </div>
      <hr className="my-3" />
      <label htmlFor="" className="font-semibold">AWS S3 Upload</label>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={submit}>Upload</Button>
    </main>
  );
}
