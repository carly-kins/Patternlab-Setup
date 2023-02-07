module.exports = class PattenlabWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.done.tap({ name: "PatternlabPlugin" }, () => {
      const plConfig = require("../patternlab-config.json");
      const patternlab = require("@pattern-lab/core")(plConfig);
      const ConfiguredCleanOption = true;
      // Patternlab Core Options
      const build = (done) => {
        done = done || function () {};
        const buildResult = patternlab.build(() => {}, ConfiguredCleanOption);
        // handle async version of Pattern Lab
        if (buildResult instanceof Promise) {
          return buildResult.then(done);
        }
      };
      const version = () => patternlab.version();
      const help = () => patternlab.help();
      const patternsonly = () => {
        noop = () => {};
        patternlab.patternsonly(noop, plConfig.cleanPublic);
      };
      const liststarterkits = () => patternlab.liststarterkits();
      const loadstarterkit = (kit, clean) => {
        if (!clean) {
          clean = false;
        }
        patternlab.loadstarterkit(kit, clean);
      };
      const installplugin = (plugin) => patternlab.installplugin(plugin);

      switch (this.options.command) {
        case "build":
          build();
          break;
        case "version":
          version();
          break;
        case "help":
          help();
          break;
        case "patternsonly":
          patternsonly();
          break;
        case "liststarterkits":
          liststarterkits();
          break;
        case "loadstarterkit":
          if (process.env.npm_config_kit) {
            loadstarterkit(
              process.env.npm_config_kit,
              process.env.npm_config_clean
            );
          } else {
            console.info("====[ Pattern Lab Error: No Valid Kit Found ]====");
          }
          break;
        case "installplugin":
          if (process.env.npm_config_plugin) {
            installplugin(process.env.npm_config_plugin);
          } else {
            console.info(
              "====[ Pattern Lab Error: No Valid Plugin Found ]===="
            );
          }
          break;
      }
      console.log("I stored the thing");
    });
  }
};

