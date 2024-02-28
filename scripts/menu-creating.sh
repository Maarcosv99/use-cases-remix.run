#!/bin/bash

PS3='Please enter your case number: '
options=("memory-cache-data" "server-sent" "websocket" "streaming" "view-transitions" "prefetching-links" "cookies" "nest-routes-with-dynamic-params" "use-fetcher-with-zod" "lru-cache" "deploy-cloudflare" "deploy-vercel" "realtime-chat" "multiple-actions" "handle" "i18n" "ai-streaming-response" "file-upload" "streaming-file-upload" "Quit")
select opt in "${options[@]}"; do

  if [ "$opt" = "Quit" ]; then
    exit 1
  else
    echo Creating case $opt
    # bash scripts/create-case.sh $opt
    exit 1
  fi

done
