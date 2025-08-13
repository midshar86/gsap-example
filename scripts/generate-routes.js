// scripts/generate-routes.js
const fs = require("fs");
const path = require("path");

const viewsDir = path.resolve(__dirname, "../src/views");
const output = path.resolve(__dirname, "../src/router/routes-generated.js");

function generateRoutes(dir) {
  const routes = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const isDir = fs.statSync(filePath).isDirectory();

    if (isDir) {
      const children = generateRoutes(filePath);
      if (children.length > 0) {
        const parentPath = path
          .relative(viewsDir, filePath)
          .replace(/\\/g, "/");
        const parentName = file.charAt(0).toUpperCase() + file.slice(1);
        routes.push({
          path: `/${parentPath}`,
          name: parentName,
          component: () => import(`../views/${parentPath}/index.vue`),
          children: children,
        });
      }
    } else if (file.endsWith(".vue")) {
      const relativePath = path
        .relative(viewsDir, filePath)
        .replace(/\\/g, "/");
      const name =
        file.replace(".vue", "").charAt(0).toUpperCase() +
        file.slice(1).replace(".vue", "");
      const routePath = `/${relativePath.replace(".vue", "")}`;

      routes.push({
        path: routePath,
        name: name,
        component: () => import(`../views/${relativePath}`),
      });
    }
  });

  return routes;
}

const routes = generateRoutes(viewsDir);

const content = `export default ${JSON.stringify(routes, null, 2).replace(
  /"(\w+)":/g,
  "$1:"
)}`;

fs.writeFileSync(output, content);
