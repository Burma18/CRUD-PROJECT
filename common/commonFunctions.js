const fs = require("fs");

const readFile = async (fileName) => {
  return await fs.promises.readFile(
    `./my${fileName}.txt`,
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    }
  );
};

const writeFile = async (fileName, content) => {
  return await fs.promises.writeFile(`./my${fileName}.txt`, content, (err) =>
    console.log(err)
  );
};

module.exports = { readFile, writeFile };
