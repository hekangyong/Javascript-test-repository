import gulp from 'gulp';
import gulpif from 'gulp-if';                //使用gulp的if语句
import concat from 'gulp-concat';           //处理文件拼接
import webpack from 'webpack';              //使用webpack来进行打包的操作
import gulpWebpack from 'webpack-stream';   //使用webpack的流来结合gulp的操作
import named from 'vinyl-named';            //对文件重名名的包
import livereload from 'gulp-livereload';     //实现文件修改后热更新的包
import plumber from 'gulp-plumber';         //处理文件信息流的 管道拼接
import rename from 'gulp-rename';           //对文件重命名的包
import uglify from 'gulp-uglify';           //处理js压缩和css压缩
import { log, colors } from 'gulp-util';    //在命令行输出的和色彩的输出
import args from './util/args'              //引入对命令行解析的包

gulp.task('scripts', () => {              //创建一个任务 这个任务的名称为scripts
    return gulp.src(['app/js/index.js'])  //打开js
        .pipe(plumber({                   //进行错误处理
            errorHandler: function () {

            }
        }))
        .pipe(named())                   //进行重命名
        .pipe(gulpWebpack({
			module: {
				loaders: [{
					test: /\.js$/,
					loader: 'babel'
				}]
			}
		}), null, (err, stats) => {        //回调
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false,
            }))
        })
        .pipe(gulp.dest('server/public/js'))  //打包后文件存放位置
        .pipe(rename({                      //重新命名
            basename: 'cp',
            extname: '.min.js'
        }))
        .pipe(uglify({ compress: { properties: false }, output: { 'quote_keys': true } })) //再行一次压缩
        .pipe(gulp.dest('server/public/js'))        //存放呀所文件的位置
        .pipe(gulpif(args.watch,livereload()))
})