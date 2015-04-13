//var port = process.env.PORT || '3000';
//var host = process.env.IP || 'localhost';
var port = process.env.PORT;
var host = process.env.IP;
var testurl = 'http://' + host + ':' + port + '/test.html';
var devurl = 'http://' + host + ':' + port + '/index.html';
module.exports = function (grunt) {
   grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
  //  grunt.loadNpmTasks('grunt-execute');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: port,
                    base: './src'
                }
            }
        },
        watch: {
           files: '**/*.js'
       },
        open: {
            test: {
                path: testurl,
                app: 'chrome'
            },
            dev: {
                path: devurl,
                app: 'chrome'
            }
        }

    });
    grunt.registerTask('test', ['connect', 'open:test','watch']);
    grunt.registerTask('default', ['connect', 'open:dev','watch']);
}
