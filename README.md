
Commands:

## Steps:
 
- Change the name property in package.json to your desired name.
- Run npm install, optionally update to latest
- Set project to your project name in Google Cloud
```
gcloud config set project yourProjectNameHere
```
- If you want to check your project: 
```
gcloud config get-value project
```

- Compile typescript
```
tsc
```
- Deploy the function
```
gcloud functions deploy yourWebhookNameHere `
    --gen2 `
    --runtime=nodejs18 `
    --region=us-central1 `
    --trigger-http `
    --allow-unauthenticated `
    --entry-point=entryPoint `
    --memory=512MB `
    --timeout=60s
```

## Notes
- Do not have multiple routes on the same endpoint, that do not share the same libraries.