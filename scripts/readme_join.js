const fs = require("fs");
const path = require("path");
const { walk, promisify } = require("./utils");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function start() {
  const paths = await walk("docs");
  const workPathRoot = process.cwd() + "/";
  const docsDir = "docs/";
  const reg = new RegExp(`\^${workPathRoot}${docsDir}(\\d\+)\\.\.\*\\.md\$`);
  // 过滤掉不合格的文件命名，然后按文件序号进行排序
  const sortPaths = paths
    .filter((item) => reg.test(item))
    .sort((a, b) => {
      const indexA = +a.match(reg)[1];
      const indexB = +b.match(reg)[1];
      return indexA > indexB ? -1 : 1;
    });
  let content = "";
  for (let index = 0; index < sortPaths.length; index++) {
    const item = sortPaths[index];
    const fileContent = await readFileAsync(item, "utf8");
    content = `${content}${index === 0 ? "" : "\n<hr>\n\n"}${fileContent}`;
  }
  const headPath = path.join(process.cwd(), "docs/head.md");
  const readmeContent = await readFileAsync(headPath, "utf8");
  await writeFileAsync("README.md", readmeContent + content);
}

start();
