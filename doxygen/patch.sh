#!/bin/sh

if [[ ! -f "_config.yml" ]]; then
  >&2 echo "Call from the root of the website repo!"
  exit 1
fi

MATCH='s/^TAGFILES.*/TAGFILES = ..\/doxygen\/cppreference-doxygen-web.tag.xml=http:\/\/en.cppreference.com\/w\//'

sed -i -e "$MATCH" main/Doxyfile
sed -i -e "$MATCH" develop/Doxyfile

exit 0
