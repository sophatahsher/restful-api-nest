#!/bin/sh
docker buildx build --platform linux/amd64 --push -t registry-domain.com/restful-api-nest:1.0.0 .