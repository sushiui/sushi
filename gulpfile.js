var gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  connect = require("gulp-connect"),
  pug = require("gulp-pug"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  iconfont = require("gulp-iconfont"),
  prettyHtml = require("gulp-pretty-html"),
  autoprefixer = require("gulp-autoprefixer"),
  consolidate = require("gulp-consolidate");

var fontName = "SET-icon";

gulp.task("compile-icon-font", function () {
  return gulp
    .src(["assets/icons/*.svg"])
    .pipe(
      iconfont({
        fontName: fontName, // required
        formats: ["ttf", "eot", "woff"], // default, 'woff2' and 'svg' are available
        timestamp: runTimestamp, // recommended to get consistent builds when watching files
        fontHeight: 1024,
        fixedWidth: true,
        centerhorizontally: true,
        centervertically: true,
        normalize: true,
        descent: 60,
      })
    )
    .on("glyphs", function (glyphs, options) {
      gulp
        .src("templates/icon_font.scss")
        .pipe(
          consolidate("lodash", {
            glyphs: glyphs,
            fontName: fontName,
            fontPath: "../fonts",
            className: "ss-icon",
            cacheBuster: (Math.random() + 1).toString(36).substring(7),
          })
        )
        .pipe(gulp.dest("src/scss/"));
    })
    .pipe(gulp.dest("assets/fonts"));
});

var runTimestamp = Math.round(Date.now() / 1000);

function reload(done) {
  connect.server({
    livereload: true,
    port: 8080,
  });
  done();
}

function styles() {
  return (
    gulp
      .src("src/scss/sushi.scss")
      .pipe(plumber())
      .pipe(
        sass().on("error", function (err) {
          sass.logError(err);
          this.emit("end");
        })
      )
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 3 versions"],
          cascade: false,
        })
      )
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(gulp.dest("assets/css"))
      // .pipe(sass({outputStyle: 'compressed'}))
      // .pipe(rename('styles.min.css'))
      // .pipe(gulp.dest('assets/css'))
      .pipe(connect.reload())
  );
}

function scripts() {
  return gulp
    .src("src/js/sushi.js")
    .pipe(plumber())
    .pipe(gulp.dest("assets/js"))
    .pipe(uglify())
    .pipe(rename("sushi.min.js"))
    .pipe(gulp.dest("assets/js"))
    .pipe(connect.reload());
}

function html() {
  return gulp.src("*.html").pipe(plumber()).pipe(connect.reload());
}

function views() {
  return gulp
    .src("src/pug/pages/*.pug")
    .pipe(plumber())
    .pipe(pug({ pretty: false }))
    .pipe(
      prettyHtml({
        indent_size: 2,
        indent_char: " ",
        preserve_newlines: true,
        unformatted: ["code", "pre", "em", "strong", "span", "i", "b"],
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
}

function watchTask(done) {
  gulp.watch("*.html", html);
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/pug/**/*.pug", views);
  gulp.watch("src/js/sushi.js", scripts);
  done();
}

const watch = gulp.parallel(watchTask, reload);
const build = gulp.series(gulp.parallel(styles, scripts, html, views));

exports.reload = reload;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.views = views;
exports.watch = watch;
exports.build = build;
exports.default = watch;
