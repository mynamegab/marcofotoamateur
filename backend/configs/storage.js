export const provideStorageConfig = () => ({
    bucketName: process.env.CLOUD_STORAGE_BUCKET_NAME,
    projectId: process.env.CLOUD_STORAGE_PROJECT_ID
});