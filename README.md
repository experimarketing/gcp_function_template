
Commands:

## Steps:
 
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
- Deploy the function with low memory of 512MB
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
- Redeploy the function with 1GB, 2GB, 4GB, and test response times in Postman. The purpose of this is to determine what the optimal memory configuration is for the machine, based on projected use, projected costs, and user experience. Example with 2GB
```
gcloud functions deploy yourWebhookNameHere `
    --gen2 `
    --runtime=nodejs18 `
    --region=us-central1 `
    --trigger-http `
    --allow-unauthenticated `
    --entry-point=entryPoint `
    --memory=2GB `
    --timeout=60s
```



## Complete the following checklist: 
1. Your export is named entryPoint.
```
exports.entryPoint = app;
```
2. Your tsconfig.json is the exact config provided in this template.

3. Any packages used must not have security vulnerabilities. The code will be rejected if secrutiy vulnerabilities come up when installing the package.

4. You have removed any unused packages from the package.json.

5. You have no dependencies that should be dev dependencies only.

6. You must test 512MB, 1GB, 2GB, 4GB response speeds. Report your results in the ``ResponseTimes.md`` file.

## Notes
- Do not have multiple routes on the same endpoint, that do not share the same libraries.