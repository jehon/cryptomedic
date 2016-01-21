
SCRIPTDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo "Script dir: $SCRIPTDIR"
php "$SCRIPTDIR/../maintenance/patch_db.php"
