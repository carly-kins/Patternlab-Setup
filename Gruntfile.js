module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: {
      folder: ["pattern_exports/", "integrated/", "public/"],
    },
    // Copy to integrated
    copy: {
      public: {
        expand: true,
        cwd: "public",
        src: ["fonts/*", "images/*", "favicon.ico"],
        dest: "integrated/",
      },
    },
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: "integrated/images/",
            src: ["**/*.{png,jpg,gif}"],
            dest: "integrated/images/",
          },
        ],
      },
    },
  });

  grunt.registerTask("default", ["clean"]);
  grunt.registerTask("dev", ["shell:patternlabStart"]);
};
