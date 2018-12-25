var fs = require('fs');

class FileSystem {

  static createDirectory(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      return true;
    }
    else
      return false;
  }

}

module.exports = FileSystem;