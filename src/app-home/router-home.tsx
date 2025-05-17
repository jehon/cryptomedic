import PageHome from "./page-home";

export function RouterHome() {
  return [
    {
      path: "/home.new",
      element: <PageHome />
    }
  ];
}
