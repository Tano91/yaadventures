export const getTypesImagePaths = () => {
  return [
    "/types/beaches.png",
    "/types/rivers.png",
    "/types/springs.png",
    "/types/caves.png",
    "/types/hikes.png",
    "/types/other.png",
  ].map((path) => {
    const filename = path
      .split("/")
      .pop()
      .replace(/\.png$/, "");
    const title = filename.charAt(0).toUpperCase() + filename.slice(1);
    return { img: path, title: title };
  });
};
