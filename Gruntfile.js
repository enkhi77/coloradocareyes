/* jslint es3: false */
/* global module:false, console:false, process:false */

module.exports = function (grunt) {

    'use strict';

    grunt.initConfig ({
        /*----------------------------------( PACKAGE )----------------------------------*/
        pkg: grunt.file.readJSON ('package.json'),
        /*----------------------------------( WATCH )----------------------------------*/
        watch: {
            files: [
                'client/src/app/**/*',
                'client/src/assets/**/*',
                'Gruntfile.js'
            ],
            tasks: ['default']
        },
        /*----------------------------------( JSHINT )----------------------------------*/
        jshint: {
            options: {
                jshintrc: '.jshintrc' // Defined options and globals.
            },
            init: [
                './Gruntfile.js'
            ]
        },
        /*----------------------------------( CLEAN )----------------------------------*/
        clean: {
            options: {
                force: true // Allows for deletion of folders outside current working dir (CWD). Use with caution.
            },
            build: [
                'client/dist/**/*',
                'client/src/assets/scripts/',
                'client/src/assets/generated/'
            ]
        },
        /*----------------------------------( UGLIFY )----------------------------------*/
        uglify: {
            build: {
                files: {
                    'client/dist/scripts/stofti.min.js': [
                        'client/src/assets/generated/*.js'
                    ]
                }
            }
        },
        /*----------------------------------( COPY )----------------------------------*/
        copy: {
            lib: {
                files: [
                    {
                        expand: true, flatten: true, cwd: 'node_modules/',
                        src: [
                            'font-awesome/css/font-awesome.css',
                            'bootstrap/dist/css/bootstrap.min.css',
                            'bootstrap/dist/css/bootstrap.min.css.map'
                        ],
                        dest: 'client/dist/css/'
                    },
                    {
                        expand: true, cwd: "node_modules/font-awesome/fonts/",
                        src: ['*'],
                        dest: 'client/dist/fonts/'
                    },
                    {
                        expand: true, flatten: true, cwd: 'node_modules/',
                        src: [
                            'angular/angular.js',
                            'angular-ui-router/release/angular-ui-router.js',
                            'angular-ui-bootstrap/ui-bootstrap-tpls.js'
                        ],
                        dest: 'client/src/assets/scripts'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true, cwd: 'client/src/assets/scripts/',
                        src: 'angular.js',
                        dest: 'client/dist/scripts/'
                    },
                    {
                        expand: true,
                        cwd: 'client/src/assets/generated/',
                        src: 'app-assets.js',
                        dest: 'client/dist/scripts/1/'
                    },
                    {
                        expand: true,
                        cwd: 'client/src/assets/scripts/',
                        src: 'angular-ui-router.js',
                        dest: 'client/dist/scripts/1/2/'
                    },
                    {
                        expand: true,
                        cwd: 'client/src/assets/scripts/',
                        src: 'ui-bootstrap-tpls.js',
                        dest: 'client/dist/scripts/1/2/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'client/src/assets/img/',
                        src: ['**/*.png'],
                        dest: 'client/dist/img/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'client/src/assets/img/',
                        src: ['*.ico'],
                        dest: 'client/dist/'
                    },
                    {
                        expand: true,
                        cwd: 'client/src/assets/css',
                        src: ['*'],
                        dest: 'client/dist/css/'
                    },
                    {
                        expand: true,
                        cwd: 'client/src/app',
                        src: ['**/*'],
                        dest: 'client/dist/app/'
                    }
                ]
            }
        },
        /*---------------------------------( CONCAT )---------------------------------*/
        concat: {
            angular: {
                src: [
                    'client/src/app/**/*.js'
                ],
                dest: 'client/src/assets/generated/stofti-angular.js'
            },
            dist: {
                src: [
                    'client/src/assets/scripts/angular.js',
                    'client/src/assets/scripts/angular-ui-router.js',
                    'client/src/assets/generated/app-angular.js',
                    'client/src/assets/generated/app-assets.js'
                ],
                dest: 'client/src/assets/generated/app-lib.js'
            }
        },
        /*---------------------------------( HTML2JS )---------------------------------*/
        html2js: {
            options: {
                module: 'assets-main'
            },
            main: {
                src: ['client/src/app/**/*.html'],
                dest: 'client/src/assets/generated/app-assets.js'
            }
        },
        /*---------------------------------( Include )---------------------------------*/
        includeSource: {
            options: {
                templates: {
                    html: {
                        js: '<script type="text/javascript" src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
                    }
                }
            },
            build: {
                options: {
                    basePath: 'client/dist'
                },
                files: {
                    'client/dist/index.html': 'client/src/assets/index.tpl.html'
                }
            }
        },

        /*---------------------------------( Angular )---------------------------------*/
        angularFileLoader: {
            build: {
                options: {
                    scripts: 'client/dist/app/**/*.js'
                },
                src: ['client/dist/index.html']
            }
        }
    });
    /*----------------------------------( TASKS )----------------------------------*/
    grunt.loadNpmTasks ('grunt-contrib-watch');
    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-contrib-clean');
    grunt.loadNpmTasks ('grunt-contrib-uglify');
    grunt.loadNpmTasks ('grunt-contrib-concat');
    grunt.loadNpmTasks ('grunt-contrib-copy');
    grunt.loadNpmTasks ('grunt-html2js');
    grunt.loadNpmTasks ('grunt-contrib-cssmin');
    grunt.loadNpmTasks ('grunt-include-source');
    grunt.loadNpmTasks ('grunt-angular-file-loader');

//----------------------------------

    grunt.registerTask ('init', []);
    grunt.registerTask ('default', ['clean', 'copy:lib', 'html2js', 'copy:dev', 'copy:dist', 'includeSource', 'angularFileLoader']);
    grunt.registerTask ('prod', ['clean', 'copy:lib', 'concat:angular', 'html2js', 'concat:dist', 'uglify', 'copy:dist', 'includeSource']);
};