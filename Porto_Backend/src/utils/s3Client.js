import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const deleteFromS3 = async (fileUrl) => {
  if (!fileUrl) return;

  try {
    const url = new URL(fileUrl);

    const key = decodeURIComponent(url.pathname.substring(1));

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    await s3.send(command);
  } catch (error) {
    console.error("S3 delete error:", error);
  }
};