/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   *   example of structures to override variables for environments. The default environment config is 'developer'
   *
   *  Example to deploy using the "ci" settings
   *    grunt deploy -env=ci
   */
  env_configs: {
    developer: {
      // platform_version: 'primerc'
        root_path: 'pg.kroger.dev.<%= login.id %>'
    },
    ci: {
      // root_path: 'pub.consumer_data.oi.ecom.ci',
      // platform_version: 'beta-latest'
    },
    test: {
      // root_path: 'pub.consumer_data.oi.ecom.test',
      // platform_version: 'beta-latest'
      // platform_gateway_host: 'https://njtest.corp.1010data.com'
    },

    beta: {
      // root_path: 'pub.consumer_data.oi.ecom.beta',
    },

    prod: {
      // root_path: 'pub.consumer_data.oi.ecom.client_portal',
      // platform_version: 'prime-latest'
    }
  },

  /**
   * The `build_dir` folder is where the projects html files are compiled too
   */
  src: 'src',
  build_dir: 'build',
  app_dir: '<%= src %>/app',

  platform_version: 'prime-latest',
  platform_gateway_host: 'https://www2.1010data.com',
  quickapp_path: '<%= platform_gateway_host %>/cgi-bin/<%= platform_version %>/quickapp?path=',

  /**
   * 1010data credentials
   */
  login: {
    gateway: '<%= platform_gateway_host %>/<%= platform_version %>/gw',
    id: '<%= login_id %>',
    password: '<%= login_password %>'
  },
    /**
     * This is where to define the developer default for root path.
     */
  root_path: 'pg.kroger.dev.<%= login.id %>',
  root_path_title: 'PG Kroger',
  basetable: 'default.lonely',

    /**
     * Define titles for folders here (and folder metadata)
     */
  init_queries: {
    create_folders: {
      table: '<%= basetable %>',
      dest: '<%= build_dir %>/_init/create_folders.xml', // tokenize template to dest using 'template' task
      // users: 'oi_ecom_internal_users',
      users: 'inherit',
      options: {
        args: '-k' // force a new session which ensures folder caches are cleared
      },
      file_configs: ['directory'],
      folders: [{ // specify folder titles and/or creation of empty folders
        folder: '<%= root_path %>',
        title: 'PG Kroger'
      }]
    }
  },
    /**
     * Custom directory builds can be overriden here. The default is to folder/objects based on folder structure underneath src
     */
  // auto-managed directory via file patterns
  directory: [{
    cwd: '<%= app_dir %>', // any grunt.file.expand settings (see https://gruntjs.com/api/grunt.file)
    src: ['**/*.xml', '!**/*_tree.xml', '!**/*.spec.xml'], // any list of grunt file patterns
    build_dir: '<%= build_dir %>/app',

    // build_dir: '', // optional (default is to use the build.config build_dir)
    // root_path: '', // optional (default is to use the build.config root_path)
    // basetable: '', // optional (default is to use the build.config basetable)

      /**
       * Overrides are object overrides inside the directory (DBM)
       */
    overrides: [{
      file: 'report2.xml',  // required - indicates which file to provide overrides for
      title: 'Report 2',
      container: '<%= app_dir %>/landing_page.html',   // html iframe container
      ordinal: 99 // deploy last because there are dependencies which must be deployed beforehand
    }, {
      file: 'lib2/lib2.xml',  // required - indicates which file to provide overrides for
      // example overriding tendo arguments for this file
      options: {
        args: '-K -y -Y "*" --query -[[DATE_TEST]]="' + new Date().toString() + '"'
      }
    }]
  }],

  // basic test driven development config which will run the spec_js unit tests when any of the specified files changes.
  // to disable set all values to '!*' or disable the jasmine_nodejs "tdd" configuration
  tdd_files: {
    module: 'app/lib2/lib2.xml',
    spec_js: 'app/lib2/lib2.spec.js',
    spec_xml: 'app/lib2/lib2.spec.xml'
  }
};
