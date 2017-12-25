
if [ "$1" = "" ]; then
  echo "Missing destination as \$1"
  exit 1
fi

HOST=`hostname`
T="Hostname $HOST at date `date`"
echo "Sending: $T to $1"
sendmail -s "$T" $1 <<EOF
  Hello,

  I wanted to say you 'hello'.

  $2

  Electronically yours
  $T
EOF
