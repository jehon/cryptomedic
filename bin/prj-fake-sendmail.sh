#!/bin/sh

if [ "$1" = "help" ]; then
  cat <<-EOL
  Fake sendmail script: dump everything into /tmp/emails.txt

  It is dumped into one file, that is followed by prj-logs. It could
  have been dumped into various files, but then, difficult to show in prj-logs.
EOL
  exit 0
fi

#prefix="/var/mail/sendmail"
date=`date \+\%Y\%m\%d\%H\%M\%N`

name="/tmp/emails.txt"

echo "********************** $date [`whoami`] *************************" >> $name

while read line; do
  echo $line >> $name
done
echo "******************************************************" >> $name

chmod 777 $name
/bin/true
