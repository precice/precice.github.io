#!/bin/sh
#
# Script needs to run from a directory which contains folders:
# - website : checkout of the precice/precice.github.io
# - main    : checkout of the precice/precice of branch main
# - develop : checkout of the precice/precice of branch develop
#
# This script patches doxygen files in main and develop:
# - it modifies the TAGFILE to point to cppreference.com
# - it sets the PROJECT_NUMBER to the release or the commit
# - it sets the SITEMAP_URL for the main doxygen reference

if [ ! -f "website/_config.yml" ] || [ ! -f "main/Doxyfile" ] || [ ! -f "develop/Doxyfile" ] ; then
  >&2 echo "Call from the root of the runner!"
  echo "Pwd $(pwd)"
  echo "Doxyfiles:"
  find . -name Doxyfile
  echo "ls :"
  ls -l
  exit 1
fi

set -e

# Remove config options
sed -e "/^ *TAGFILES/d" -e "/^ *SITEMAP_URL/d" -e "/^ *PROJECT_NUMBER/d" -i main/Doxyfile develop/Doxyfile

BASEURL="https://precice.org/doxygen"
# This is relative to the Doxyfile
TAGFILE="../website/doxygen/cppreference-doxygen-web.tag.xml=http://en.cppreference.com/w/"

echo "SITEMAP_URL = $BASEURL/main/" >> main/Doxyfile

echo "TAGFILES = $TAGFILE" >> main/Doxyfile
echo "TAGFILES = $TAGFILE" >> develop/Doxyfile

echo "PROJECT_NUMBER = $( cd main && git describe --tags )" >> main/Doxyfile
echo "PROJECT_NUMBER = $( cd develop && git rev-parse --short HEAD )" >> develop/Doxyfile

exit 0
