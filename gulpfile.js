const gulp = require("gulp")
const purgecss = require("gulp-purgecss")
const gcmq = require("gulp-group-css-media-queries")
const cleanCSS = require("gulp-clean-css")

gulp.task("purgecss", () => {
  return gulp
    .src(".next/static/css/*.css")
    .pipe(
      purgecss({
        content: [".next/server/pages/**/*.html"],
        safelist: {
          standard: [/(collaps|modal|fixed-bottom|alert|p-0|m-0|fade|show|offcanvas|btn|justify-content-end|flex-sm-column|flex-grow-1|pe-3|text-bg-dark|navbar-nav|py-sm-3|active|nav-link).*/],
        },
      })
    )
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(gulp.dest(".next/static/css"))
})
