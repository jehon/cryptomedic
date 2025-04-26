import HomeElement from "./home-element";

export function HomeRouter() {
  return [
    {
      path: "/home.new",
      element: <HomeElement />
    }
  ];
}
