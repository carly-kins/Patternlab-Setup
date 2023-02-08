const plConfig = require("../../patternlab-config.json");
const patternlab = require("@pattern-lab/core")(plConfig);
const ConfiguredCleanOption = true;
// Patternlab Core Options
const build = (done) => {
  done = done || function () {};
  const buildResult = patternlab.build({
    cleanPublic: true,
    watch: true,
  });
  // handle async version of Pattern Lab
  if (buildResult instanceof Promise) {
    return buildResult.then(done);
  }
};
build();
