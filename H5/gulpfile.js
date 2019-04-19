var gulp = require('gulp')
var js = require('gulp-babel')
var webserver = require('gulp-webserver')


gulp.task('server', () => {
    return gulp.src('./src/')
        .pipe(webserver({
            open: true,
            port: 8682,
            host: 'localhost',
            livereload: true,
            proxies: [{
                    source: '/api/findUser',
                    target: 'http://localhost:3000/api/findUser', //所有成员信息
                },
                {
                    source: '/api/findUserOne',
                    target: 'http://localhost:3000/api/findUserOne', //查询具体信息
                },
                {
                    source: '/api/upUser',
                    target: 'http://localhost:3000/api/upUser', //修改成员信息
                },
                {
                    source: '/api/delUser',
                    target: 'http://localhost:3000/api/delUser', //删除成员信息
                },
                {
                    source: '/api/addUser',
                    target: 'http://localhost:3000/api/addUser', //添加成员信息
                },

            ]
        }))
})

gulp.task('es6', () => {
    return gulp.src(['./src/js/**/*.js', '!./src/js/libs/*.js']) //匹配0个或者多个文件夹
        .pipe(js({
            presets: 'es2015'
        }))
        .pipe(gulp.dest('./dist/js/')) //libs 不编译
})