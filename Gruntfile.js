module.exports = function (grunt) {
    grunt.initConfig({
        build_dir: 'build',
        copy: {
            theme: {
                files: [
                    {
                        expand: true,
                        src: [
                            'assets/**',
                            'favicon.png'
                        ],
                        dest: 'build/'
                    }
                ]
            },
            socketio: {
                files: [
                    {
                        expand: true,
                        src: [
                            'app/vendors/socket.io.min.js'
                        ],
                        rename: function(dest, src) {
                            return dest + 'socket-io.js';
                        },
                        dest: 'build/'
                    }
                ]
            }
        },
        requirejs: {
            frontend: {
                options: {
                    baseUrl: './app',
                    optimize: 'none',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: {
                        start: "(function() {",
                        end: "require(['app']) }());"
                    },
                    mainConfigFile: './app/app-bootstrap.js',
                    name: 'app',
                    include: [],
                    exclude: ['./vendors/socket.io.min.js'],
                    out: 'build/main.js'
                }
            }
        },
        uglify: {
            requirejs: {
                src: ['bower_components/requirejs/require.js'],
                dest: '<%= build_dir %>/r.js'
            },
            frontend: {
                src: ['<%= build_dir %>/main.js'],
                dest: '<%= build_dir %>/main.js'
            },
            options: {
                banner: '/*! <%= banner %> */\n',
                compress: false,
                mangle: false,
                preserveComments: false,
                beautify: {
                    ascii_only: true
                }
            }
        },
        watch: {
            css: {
                files: '*',
                tasks: [],
                options: {
                    livereload: true
                }
            }
        },
        php: {
            dev: {
                options: {
                    hostname: '127.0.0.1',
                    port: 8081
                }
            }
        },
        htmlmin: {
            backend: {
                files: {
                    'build/index.html': 'index.html'
                },
                options: {
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeOptionalTags: true,
                    collapseWhitespace: true
                }
            }
        },
        replace: {
            default: {
                src: 'build/index.html',
                overwrite: true,
                replacements: [
                    {
                        from: /<script src="(.*)\/require.js"(.*)><\/script>/gm,
                        to: '<script src="/r.js" data-main="main"></script>'
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
//    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-hustler');

    grunt.registerTask('dev', [
//        'copy',
        'php:dev',
        'watch'
    ]);
    grunt.registerTask('default', [
//        'ngTemplateCache',
//        'less:theme',
        'copy',
        'requirejs',
        'uglify',
        'htmlmin',
        'replace'
    ]);
};
