# sushi
Sushi is Design System build for SET



## SASS

### Install SASS on Mac OS X or Linux (Homebrew)

If you use the Homebrew package manager for Mac OS X or Linux, you can install Dart Sass by running

```
brew install sass/sass/sass
```

### Compile SASS 

Add watch command : After the first round compilation is done Sass stays open and continues compiling stylesheets whenever they or their dependencies change.

```
sass --watch sushi.scss:sushi.css
```


### SASS Style

https://rscss.apirak.com/

![This is an image](images/rscss.png)

## HTML

### Install Pug

```
brew install node
npm install pug-cli -g
npm install pug
```

### Watch HTML

```
pug -wP demo.pug
```