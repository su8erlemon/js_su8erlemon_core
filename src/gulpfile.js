var gulp = require("gulp");
var uglifyjs = require( 'gulp-uglifyjs' );
var sass = require("gulp-sass");
// var uglify = require("gulp-uglify");
// var concat = require('gulp-concat');
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function() {
    browser({
        server: {
             baseDir: "./../release"
            // ,index:"index.html"
            ,index:"index-soundcloud.html"
        }
    });
});

gulp.task("sass", function() {
    gulp.src("./sass/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("./../release/css"))
        .pipe(browser.reload({stream:true}))
});

gulp.task( 'js', function () {

  return gulp.src(
  [
    "js/classes/core/ClassFactory.js",
    "js/classes/core/EventDispatcher.js",
    "js/classes/core/ElementObject.js",
    "js/classes/core/Window.js",
    "js/classes/events/Event.js",
    "js/classes/events/SceneEvent.js",
    "js/classes/utils/StringUtil.js",
    "js/classes/utils/BrowserUtil.js",
    "js/classes/utils/LoadingUtil.js",
    "js/classes/utils/math/TCBSpline.js",
    "js/classes/utils/math/Vec3.js",
    "js/classes/utils/math/Vec4.js",
    "js/classes/utils/math/Mat2.js",
    "js/classes/utils/math/Mat4.js",
    "js/classes/utils/math/MathUtil.js",
    "js/classes/controller/ResizeController.js",
    "js/classes/controller/SoundController.js",
    "js/classes/controller/SceneController.js",
    "js/classes/controller/SoundCloudController.js",
    "js/classes/core/SampleClass.js",
    "js/classes/scene/TopScene.js",
    "js/classes/scene/ArticleScene.js",
    "js/classes/webgl/WebGLContext.js",
    "js/classes/webgl/ProgramObject.js",
    "js/classes/webgl/TextureObject.js",
    "js/classes/webgl/VBObject.js",
    "js/classes/svg/SVGModel.js",
    "js/classes/view/common/TextAnimationView.js",
    "js/classes/Main.js"
  ], { base: 'js' } )
    .pipe(plumber())
    .pipe( uglifyjs( 'main.min.js', { outSourceMap: true } ) )
    .pipe( gulp.dest( './../release/js' ) )
    .pipe(browser.reload({stream:true}))
} );


gulp.task( 'html', function () {
   gulp.src("./sass/*.scss")
        .pipe(browser.reload({stream:true}))
} );

gulp.task("default",['server'], function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
    gulp.watch("./../release/*.html",["html"]);
});