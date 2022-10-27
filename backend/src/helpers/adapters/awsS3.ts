import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
// import { s3KeyNormalizer } from 'middy/middlewares'

const XAWS = AWSXRay.captureAWS(AWS)

export const s3 = new XAWS.S3({
  signatureVersion: 'v4'
})
export const bucketName = process.env.ATTACHMENT_S3_BUCKET