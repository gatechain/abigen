#!/usr/bin/env node
const { execSync } = require("node:child_process");
const path = require("node:path");

// start
main();

function main() {
  const argv = process.argv;

  const abis = argv[2];
  const out = argv[3];
  const abiBasePath = argv[4] || "abibasepath='src/abis'";

  if (!abis) {
    throw new Error("abis=xxxx必传");
  }

  if (!out) {
    throw new Error("out=xxxx必传");
  }

  const options = {
    abis: formatOption(abis),
    out: formatOption(out),
    abibasepath: formatArg(abiBasePath),
  };
  console.log(options, "options");

  try {
    console.log("开始打包....");
    const temp = path.join(
      __dirname,
      "..",
      "template/partials/**/*.handlebars"
    );
    const contemp = path.join(__dirname, "..", "template/contract.handlebars");
    const cmd = `npx abi-gen --abis '${options.abis}' --out '${options.out}' --partials '${temp}' --template '${contemp}' --abibasepath='${options.abibasepath}'`;
    execSync(cmd);
    console.log("打包成功");
    return true;
  } catch (err) {
    throw err;
  }
}

function formatArg(s_arg) {
  return s_arg.split("=")[1];
}
function formatOption(s_arg) {
  return path.join(process.cwd(), formatArg(s_arg));
}
