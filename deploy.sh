# abort on errors

set -e

# update gh-pages

git checkout gh-pages
git pull git@github.com:sushiui/sushi.git main

# build

npm install
npm run build

# git

git add -A
git commit -am "deploy"
git push -f git@github.com:sushiui/sushi.git main:gh-pages
git checkout main
