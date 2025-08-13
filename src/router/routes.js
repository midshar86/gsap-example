let routes = [
  {
    path: "/",
    redirect: {
      name: "home",
    },
  },
];
const tempRoutes = [];
const files = import.meta.glob("/src/views/**/*.vue");
// 判断是文件夹还是文件
console.log("files==>", files);
for (const path in files) {
  const name = path
    .replace(/(\.\/src\/views\/|\.vue)/g, "")
    .split("/")
    .pop()
    .toLowerCase();
  tempRoutes.push({
    name,
    path: `/${name}`,
    component: files[path],
  });
}
routes = routes.concat(tempRoutes);
console.log("路径==>", routes);
export default routes;
