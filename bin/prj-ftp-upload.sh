#!/bin/sh

# http://lftp.yar.ru/lftp-man.html

LROOT="/home/jehon/src/cryptomedic/www"

OPEN="open $CRYPTOMEDIC_FTP_HOST -u $CRYPTOMEDIC_FTP_USER,$CRYPTOMEDIC_FTP_PASS"
PUSH=<<-PUSH
  mirror
    --dry-run
    --reverse
    --parallel=2
    --exclude "/api/v1.0/storage"
    --use-cache
PUSH
    # --exclude-glob-from=[file]

echo lftp -e "$OPEN; \
  $PUSH $LROOT/api /web/api; \
  $PUSH $LROOT/build /web/build; \
  "
