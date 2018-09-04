var gulp = require("gulp");
var sass = require("gulp-sass");
var mincss = require("gulp-clean-css");
var server = require("gulp-webserver");
var path = require("path");
var fs = require("fs");
var url = require("url");
gulp.task("sassa", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest("./src/css"))
})
gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    res.end("")
                    return;
                }
                pathname = pathname === "/" ? "/index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
            }
        }))
})
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sassa"))
})
gulp.task("dev", gulp.series("sassa", "server", "watch"))