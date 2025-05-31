import PageHome from "./page-home";

export function RouterHome() {
  return [
    {
      path: "/",
      element: <PageHome />
    }
  ];
}
