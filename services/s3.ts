import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const baseCfg = {
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID || 'test',
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY || 'test',
    },
}
const s3Mode = process.env.NEXT_PUBLIC_AWS_S3_MODE || 'local'
const cfg = s3Mode !== 'local'
    ? baseCfg
    : {
        ...baseCfg,
        endpoint: 'http://s3.localhost.localstack.cloud:4566',
    }

const s3 = new S3Client(cfg);

async function upload(file: File) {
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || 'tauri-s3',
        Key: file.name,
        Body: file
    };
    return await s3.send(new PutObjectCommand(params));
}

export { upload };

