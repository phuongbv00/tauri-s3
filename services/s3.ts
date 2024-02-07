import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

async function upload(file: File, cfg: {
    bucketName: string,
    useLocalStack: boolean,
    region: string,
    accessKeyId: string,
    secretAccessKey: string,
}) {
    const baseCfg = {
        region: cfg.region,
        credentials: {
            accessKeyId: cfg.accessKeyId,
            secretAccessKey: cfg.secretAccessKey,
        },
    }
    const s3 = new S3Client(cfg.useLocalStack
        ? {
            ...baseCfg,
            endpoint: 'http://s3.localhost.localstack.cloud:4566',
        }
        : baseCfg);
    const params = {
        Bucket: cfg.bucketName,
        Key: file.name,
        Body: file
    };
    return await s3.send(new PutObjectCommand(params));
}

export { upload };

