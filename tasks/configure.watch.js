module.exports = function (grunt) {

  var envConfig = require('../env.config.js')(grunt);
  var _ = require('lodash');

  return _.extend({
      /**
       * By default, we want the Live Reload to work for all tasks; this is
       * overridden in some tasks (like this file) where browser resources are
       * unaffected. It runs by default on port 35729, which your browser
       * plugin should auto-detect.
       */
      options: {
        livereload: true,
        livereloadOnError: false,
        spawn: false
      },

      html: {
        files: ['<%= directory.report2.container %>'],
        tasks: ['build']
      },

      specs: {
        files: ['src/**/*.spec.js', '!<%= src %>/<%= tdd_files.spec_js %>'],
        tasks: ['build'],
        options: {
          livereload: false
        }
      },

      config_files: {
        files: ['Gruntfile.js', 'tasks/**/*.js', 'build.config.js'],
        tasks: ['build'],
        options: {
          reload: true
        }
      },

      gruntfile: {
        files: ['Gruntfile.js', 'tasks/**/*.js', 'build.config.js'],
        options: {
          reload: true,
          livereload: false
        }
      },

      weather: {
        files: ['src/queries/weather.xml'],
        tasks: ['tendo:weather']
      }
    },

    // watch all defined directory
    envConfig.util.buildWatcherTasks('directory', ['template', 'tendo']),

    // tdd tasks need to occur after any other watchers to ensure proper order is maintained
    {
      tdd: {
        files: ['<%= src %>/<%= tdd_files.module %>', '<%= src %>/<%= tdd_files.spec_js %>', '<%= src %>/<%= tdd_files.spec_xml %>'],
        tasks: ['tdd'],
        options: {
          spawn: true
        }
      }
    }
  );
};
