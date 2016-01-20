#!/bin/sh

for F in `find $1 \( -name '*.jpg' -o -name '*.png' \) -print`; do
  width=`identify -format %w $F`
  if [ $width -gt 700 ]; then
    echo $F Too big
    convert $F -resize 700x\> $F
  fi
done
