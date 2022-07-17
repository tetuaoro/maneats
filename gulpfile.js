const gulp = require("gulp")
const purgecss = require("gulp-purgecss")
const gcmq = require("gulp-group-css-media-queries")
const cleanCSS = require("gulp-clean-css")

gulp.task("purgecss", () => {
  return gulp
    .src(".next/static/css/*.css")
    .pipe(
      purgecss({
        content: [".next/server/pages/*.html"],
        safelist: {
          standard: [/(collaps|fade|show).*/],
        },
      })
    )
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(gulp.dest(".next/static/css"))
})
