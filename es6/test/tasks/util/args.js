import yargs from 'yargs';  //处理命令行参数

const args = yargs

    /*
    *.option 是在命令行中的参数
    */

    .option('production', {  //在gulp中的开发
        boolean: true,
        defaut: false,
        describe: 'min all script'
    })

    .option('watch', {     //在gulp总的监听
        boolean: true,
        default: false,
        describe: 'watch all files'
    })

    .option('verbose', {
        boolean: true,
        default: false,
        describe: 'log'
    })

    .option('sourcemaps', {
        describe: 'farce the creation of sroucemaps'
    })

    .option('port', {   //在gulp开设的端口
        string: true,
        default: 8080,
        describe: 'server port'
    })

    .argv

export default args;
