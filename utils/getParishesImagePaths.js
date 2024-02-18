export const getParishesImagePaths = () => {
  return [
    "/parishes/Clarendon.png",
    "/parishes/Hanover.png",
    "/parishes/Kingston.png",
    "/parishes/Manchester.png",
    "/parishes/Portland.png",
    "/parishes/St. Andrew.png",
    "/parishes/St. Ann.png",
    "/parishes/St. Catherine.png",
    "/parishes/St. Elizabeth.png",
    "/parishes/St. James.png",
    "/parishes/St. Mary.png",
    "/parishes/St. Thomas.png",
    "/parishes/Trelawny.png",
    "/parishes/Westmoreland.png",
  ].map((path) => {
    const listings = 0;
    const parish = path
      .split("/")
      .pop()
      .replace(/\.png$/, "");

    return { img: path, parish: parish };
  });
};
