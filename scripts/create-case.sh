CASE=$1

# Create folder if not exists
if [ -d cases/$CASE ]; then
  echo Folder cases/$CASE already exists.
  exit 1
else
  mkdir cases/$CASE
fi

# Clone template
echo Cloning template
rsync -av -q --exclude='node_modules' template/ cases/$CASE

# Go to folder
cd ./cases/$CASE

# Change package.json name
tmp=$(mktemp)
jq --arg case "$CASE" '.name="@workspace/cases-\($case)"' package.json >"$tmp" && mv "$tmp" package.json

echo Installing dependencies
pnpm install

echo Case $CASE created
