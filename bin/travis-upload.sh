#!/bin/bash

HOST=http://www.cryptomedic.org/
HOST=http://localhost/

if [ "$1" = "" ]; then
  echo "No file given"
  return 0
fi

curl  \
  --header "Token: $RESULT_UPLOAD" \
  -F "travis=test_$TRAVIS_BUILD_NUMBER" \
  -F "original=$1" \
  -F "file=@$1" \
  $HOST/cryptomedic/maintenance/travis.php?quiet=true

echo "Uploaded $1"
