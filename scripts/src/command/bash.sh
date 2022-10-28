find -iname package.json -execdir bash -c 'npm show $(cat package.json | jq -r .name) version^C \;
