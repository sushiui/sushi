# abort on errors
set -e

# change branch
git checkout gh-pages

# build
npm install
npm run build

# git 
git add -A
git commit -m "deploy"

git push -f git@github.com:sushiui/sushi.git main:gh-pages

git checkout main
