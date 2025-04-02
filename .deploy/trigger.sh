#!/bin/bash
#
# kubectl deployment
#
# Usage:
#
# ./deploy/bin/trigger [ENVIRONMENT] [K8S_CLUSTER] [K8S_TOKEN] [VERSION: default(git rev-parse --short HEAD)]
#

app=${1:-$APP}
environment=${1:-$ENVIRONMENT}
version=${2:-$VERSION}
token=${3:-$K8S_TOKEN}
cluster=${4:-$K8S_CLUSTER}

if  [ "$version" == "" ] ; then
  echo "Error! You need to send the version parameter"
  exit 1
fi

echo "Find config"
config_file=k8s-$environment-$version.yml

echo "Change version"
VERSION=$version envsubst < .deploy/$app/deployment.yml > $config_file

echo "Doing deploy"
## Apply the new deployment to the k8s
kubectl \
  apply --record -s $cluster \
  --token=$token \
  -f $config_file \
  --insecure-skip-tls-verify || exit 1

echo "Check the deploy"
## Check if the deploy was successful or not
kubectl \
  rollout status \
  -s $cluster \
  --token=$token \
  -f $config_file \
  --insecure-skip-tls-verify || {
## If deploy failed, undo it
kubectl \
  rollout undo \
  -s $cluster \
  --token=$token \
  -f $config_file \
  --insecure-skip-tls-verify; exit 1; }