
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
// load the environment variables from your .env.dev file
Get-Content .env.dev | ForEach-Object {
    $name, $value = $_ -split '='
    [System.Environment]::SetEnvironmentVariable($name, $value)
}

// Use these variables when deploying
$envVars = (Get-Content .env.dev) -join ','


gcloud functions deploy yourWebhookNameHere `
    --gen2 `
    --runtime=nodejs18 `
    --region=us-central1 `
    --trigger-http `
    --allow-unauthenticated `
    --entry-point=entryPoint `
    --memory=512MB `
    --timeout=60s `
    --set-env-vars $envVars

```
- Redeploy the function with 1GB, 2GB, 4GB, and test response times in Postman. The purpose of this is to determine what the optimal memory configuration is for the machine, based on projected use, projected costs, and user experience. Example with 2GB
```
// load the environment variables from your .env.dev file
Get-Content .env.dev | ForEach-Object {
    $name, $value = $_ -split '='
    [System.Environment]::SetEnvironmentVariable($name, $value)
}

// Use these variables when deploying
$envVars = (Get-Content .env.dev) -join ','

gcloud functions deploy yourWebhookNameHere `
    --gen2 `
    --runtime=nodejs18 `
    --region=us-central1 `
    --trigger-http `
    --allow-unauthenticated `
    --entry-point=entryPoint `
    --memory=2GB `
    --timeout=60s `
    --set-env-vars $envVars
```
You cannot set concurrency on a deployment with less than 2GB of memory.

You can test the function under load, by sending a bunch of requests at once and monitoring the stats in the function's metrics dashboard.



## Complete the following checklist: 
1. Your export is named entryPoint.
```
exports.entryPoint = app;
```
2. Your tsconfig.json is the exact config provided in this template.

3. Any packages used must not have security vulnerabilities. The code will be rejected if secrutiy vulnerabilities come up when installing the package.

4. You have removed any unused packages from the package.json.

5. You have no dependencies that should be dev dependencies only. (Meaning, you forgot to make them dev only.)

6. You must test 512MB, 1GB, 2GB, 4GB response speeds. Report your results in the ``ResponseTimes.md`` file.

7. If you add any packages, you must list the license for that dependency. If not MIT, BSD, Apache 2.0, Unlicense, CCO, Zlib, ISC, you must request permission before using that dependency.

## Notes
- Do not have multiple routes on the same endpoint, that do not share the same libraries.