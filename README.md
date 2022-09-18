# Signed URL Upload Demo

Create `.env.local` with correct values:

```
NEXT_PUBLIC_TEMP_GCS_BUCKET=
GCS_PROJECT_ID=
GCS_CLIENT_EMAIL=
GCS_PRIVATE_KEY=
```

Sample values for `.env.local`, ensure the data shape will look like these:

```
NEXT_PUBLIC_TEMP_GCS_BUCKET="bucket-temp"
GCS_PROJECT_ID="project-test-321215"
GCS_CLIENT_EMAIL="test-email@project-test-321215.iam.gserviceaccount.com"
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI\n-----END PRIVATE KEY-----\n"
```

## Install dependencies

Recommended `node` version: 16 or >=14.9

```
corepack enable
pnpm install
pnpm dev
```

Open: http://localhost:3000
