#! /bin/bash

set -e

npm run build

aws s3 sync ./public/ s3://bestsoundboard.com --delete
aws cloudfront create-invalidation --distribution-id E1RT98CGFNUMFN --paths "/*"