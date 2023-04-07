#!/bin/bash
echo 'Deleting the zip file'
timestamp=$(date +%s)
echo ${timestamp}
zip -r ../${timestamp}.zip *
cd ..
echo 'Created new ZIP file'
aws s3 cp ${timestamp}.zip s3://abl-lambda-artifacts/Dev-Notifications-2/${timestamp}.zip
echo "Done s3 upload"
aws lambda update-function-code --function-name  Dev-Notifications-2 --s3-bucket abl-lambda-artifacts --s3-key Dev-Notifications-2/${timestamp}.zip
echo "Updated code to lambda app"


 # echo "Running migration"
 # aws lambda invoke --function-name cync-webhook-migrator --payload '{}' out.json

echo s3://abl-lambda-artifacts/Dev-Notifications-2/${timestamp}.zip




