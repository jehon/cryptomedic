#!/usr/bin/env bash

set -o pipefail
set -o errexit

run_mysql() {
  mysql -uroot cryptomedic "$@"
}

version="$(run_mysql --raw --silent -e 'SELECT value FROM settings WHERE id = "structure_version"')"
echo "Initial version: $version"

readarray -d '' files < <(printf '%s\0' /versions/* | sort -zV)
for f in "${files[@]}"; do
  fn="$(basename "$f")"
  if [[ "$fn" =~ ^([0-9]+)" " ]]; then
    vf="${BASH_REMATCH[1]}"
    if ((vf <= version)); then
      echo "Skipping $fn [$vf]"
    else
      echo "Running $fn [$vf]"
      run_mysql <"$f"
      version="$vf"
      run_mysql --raw --silent -e 'UPDATE settings SET value='"$version"' WHERE id = "structure_version"'
    fi
  else
    echo "Running $fn [invalid]"
    docker_process_sql <"$f"
  fi
done

version="$(run_mysql --raw --silent -e 'SELECT value FROM settings WHERE id = "structure_version"')"
echo "Final version: $version"
