#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const projectsList = ["Firefox", "Google-Chrome", "Mobile-Chrome"];
const sourceDir = "./tests/e2e";
const outputDir = "tmp/integration/playwright/test-results/";
const OS = "linux";

//
// tests/e2e  /login.spec.ts-snapshots/login-and-go-to-home-1-Firefox-linux.png
// {sourceDir}
//
//   ==> login.spec.ts-snapshots/login-and-go-to-home-1-Firefox-linux.png
//
//   login     .spec.ts
//   {filename        }
//   {testName}
//
//   {testName}.spec.ts-snapshots/{name}-{browser}-{os}.png
//   {filename        }
//   {snapshotsDir              }/{snapshots[]}
//
type OriginalTest = {
  filename: string;
  testName: string;
  snapshotsDir: string;
  snapshots: OriginalTestSnapshot[];
};

type OriginalTestSnapshot = string;

const testsList: OriginalTest[] = await Promise.all(
  (await fs.promises.readdir(sourceDir))
    .filter((n) => n.endsWith(".spec.ts"))
    .map(async (filename) => {
      const snapshotsDir = path.join(sourceDir, filename + "-snapshots");
      return {
        filename,
        testName: filename.replace(".spec.ts", ""),
        snapshotsDir,
        snapshots: await fs.promises.readdir(snapshotsDir).catch(() => [])
      };
    })
);

//
// tmp/integration/playwright/test-results/login-login-and-go-to-home-Firefox/login-and-go-to-home-1-actual.png
// {outputDir                             }
//
//   ==> login-login-and-go-to-home-Firefox/login-and-go-to-home-1-actual.png
//
//  login-login-and-go-to-home-Firefox  /login-and-go-to-home-1-actual.png
//  {dirname                           }-{name}-{browser}/{name}-actual.png
//  {est}-{testName          }-{project}/
//
const testsResultList = await Promise.all(
  (await fs.promises.readdir(outputDir)).map(async (dirname) => {
    const testName = testsList.filter((t) => dirname.startsWith(t.testName))[0]
      .testName;
    const project = projectsList.filter((p) => dirname.endsWith(p))[0];
    const subtestName = dirname
      .replace(testName + "-", "")
      .replace("-" + project, "");

    const snapshots = (await fs.promises.readdir(path.join(outputDir, dirname)))
      .filter((n) => n.includes("-actual"))
      .map((filename) => {
        const basename = filename.replace("-actual.png", "");
        const matchingTest: OriginalTest = testsList.filter(
          (to) => to.testName == testName
        )[0];
        const expectedPath = path.join(
          matchingTest.snapshotsDir,
          basename + "-" + project + "-" + OS + ".png"
        );
        return {
          filepath: path.join(outputDir, dirname, filename),
          filename,
          basename,
          testName,
          matchingTest,
          expectedPath
        };
      });
    return { dirname, testName, subtestName, project, snapshots };
  })
);

const oneToOne = testsResultList
  .map((tr) =>
    tr.snapshots.map((trs) => ({
      from: trs.filepath,
      to: trs.expectedPath
    }))
  )
  .flat();

const testFilesList = testsList
  .map((el) => el.snapshots.map((sn) => path.join(el.snapshotsDir, sn)))
  .flat();

const unusedTestFiles = testFilesList.filter(
  (f) => !oneToOne.map((o) => o.to).includes(f)
);

// console.info(
//   JSON.stringify(
//     {
//       projectsList,
//       testsList,
//       testsResultList,
//       oneToOne,
//       testFilesList,
//       unusedTestFiles
//     },
//     null,
//     2
//   )
// );

for (const uf of unusedTestFiles) {
  process.stdout.write(`Removing: ${uf}\n`);
  await fs.promises.unlink(uf);
}

for (const { from, to } of oneToOne) {
  if (await fs.promises.stat(to)) {
    process.stdout.write(`Updating: ${to}\n`);
    await fs.promises.unlink(to);
  } else {
    process.stdout.write(`Creating: ${to}\n`);
    await fs.promises.mkdir(path.dirname(to), { recursive: true });
  }
  await fs.promises.copyFile(from, to);
}
