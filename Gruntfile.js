module.exports = function(grunt) {
    grunt.initConfig ({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            productions: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
            }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: {
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'],
                    dest: 'dev/'
                }
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        }
                    ]
                },
                files: {
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/'
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'dist/scripts/main/min.js':'src/scripts/main.js'
                }
            }
        }
    })


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:productions', 'uglify']);
}