const { resolve } = require("path");
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");
const runSequence = require("run-sequence");
const $ = require("gulp-load-plugins")({
    lazy: true
});
const webpack = require("webpack");

gulp.task("es6", function(cb){

    return webpack(require("./webpack.config.js"), function(err, stats){
        if(err) throw err;
        console.log( stats.toString() );
        cb();
    });

});


gulp.task("css", function() {

    return gulp.src("./src/sass/main.scss")
        .pipe($.plumber())
        .pipe($.sass.sync({
            outputStyle: 'expanded'
        }))
        .pipe($.autoprefixer({
            browsers: ["last 5 versions", "IE 10"]
        }))
        .pipe(gulp.dest("./src/css/"))
        .pipe(browserSync.stream());

});

gulp.task("server", function() {

    browserSync.init({
        server: {
            baseDir: "./src"
        },
        notify: false,
        open: false
    });

});

gulp.task("reload", function() {

    browserSync.reload();

});

gulp.task("clean", function() {

    return del(["./src/dev"], {
        force: true
    });

});

gulp.task("watch", function() {

    gulp.watch("./src/sass/**/*.scss", { interval: 500 }, ["css"]);
    gulp.watch("./src/js/**/*.js", {interval: 500}, function(){
        runSequence("clean", "es6", "reload");
    });

});

gulp.task("default", runSequence("clean", "css", "es6", "server", "watch"));
