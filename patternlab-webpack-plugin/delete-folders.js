const fs = require('fs');
const { path, dirname } = require('path');
const appDir = dirname(require.main.filename);

fs.rmdir(path.join(appDir, '..', '..', 'newfolder'), (err) => {

    if (err) {
        return console.log("error occurred in deleting directory", err);
    }

    console.log("Directory deleted successfully");
});