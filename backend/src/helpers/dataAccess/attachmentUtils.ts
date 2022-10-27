import { s3, bucketName } from '../adapters/awsS3'

// const bucketName = process.env.ATTACHMENT_S3_BUCKET
// // TODO: Implement the fileStogare logic

export async function getUploadUrl(imageId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: 300
  })
}