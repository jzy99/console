#!/usr/bin/env bash

set -exuo pipefail

./bin/bridge \
    --base-address=http://localhost:9000 \
    --ca-file=examples/ca.crt \
    --k8s-auth=oidc \
    --k8s-mode=off-cluster \
    --k8s-mode-off-cluster-endpoint=$(oc whoami --show-server) \
    --k8s-mode-off-cluster-skip-verify-tls=true \
    --listen=http://127.0.0.1:9000 \
    --public-dir=./frontend/public/dist \
    --user-auth=oidc \
    --user-auth-oidc-client-id=login \
    --user-auth-oidc-issuer-url=https://auth.ist2.io/dex \
    --user-auth-oidc-client-secret=4TORGiNV9M54BTk1v7dNuFSaI6hUjfjr \
    --user-auth-oidc-ca-file=examples/ca.crt \
    --k8s-mode-off-cluster-prometheus=http://pm.ist2.io \
    --k8s-mode-off-cluster-alertmanager=http://am.ist2.io \
    --k8s-mode-off-cluster-thanos=http://pm.ist2.io
