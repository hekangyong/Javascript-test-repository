import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args'              //引入对命令行解析的包

gulp.task('browser', (cb) => {
    if(!args.watch) return cb();

    gulp.watch('app/**/*.js', ['scripts']);   //如果在app中的js文件发生了该百年则调用scripts的任务
    gulp.watch('app/**/*.ejs', ['pages']);    //如果在app中的ejs文件发生了该百年则调用pages的任务
    gulp.watch('app/**/*.css', ['css']);      //如果在app中的css文件发生了该百年则调用css的任务
})