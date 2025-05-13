#!/bin/bash

ROOT_DIR="$(pwd)"
OUTVERSE_DIR="$ROOT_DIR/outverse"
IMAGES_DIR="$ROOT_DIR/images"

# Find all .mdx files in the root directory tree
find "$ROOT_DIR" -type f -name "*.mdx" | while read -r mdx_file; do
  # Extract all matching URLs (ucarecdn.com/UUID/)
  grep -oE 'https://ucarecdn\.com/[a-f0-9-]+/' "$mdx_file" | while read -r url; do
    uuid=$(basename "$url")

    # Search for image file with UUID.webp inside outverse (recursively)
    src_img=$(find "$OUTVERSE_DIR" -type f -iname "ucarecdn-$uuid.webp" | head -n 1)

    if [[ -n "$src_img" ]]; then
      # Determine where to copy the image based on the .mdx file location
      mdx_rel_path="${mdx_file#$ROOT_DIR/}"  # Strip root path
      mdx_dir=$(dirname "$mdx_rel_path")
      dest_dir="$IMAGES_DIR/$mdx_dir"
      dest_img="$dest_dir/$uuid.webp"
      rel_img_path="/images/${mdx_dir:+$mdx_dir/}$uuid.webp"

      # Create destination directory and copy image
      mkdir -p "$dest_dir"
      echo $dest_dir
      cp "$src_img" "$dest_img"

      # Replace URL in the .mdx file with relative path
      escaped_url=$(printf '%s\n' "$url" | sed 's/[\/&]/\\&/g')
      escaped_path=$(printf '%s\n' "$rel_img_path" | sed 's/[\/&]/\\&/g')
      sed -i '' -e "s/$escaped_url/$escaped_path/g" "$mdx_file"
    else
      echo "Warning: No image found for UUID $uuid"
    fi
  done
done