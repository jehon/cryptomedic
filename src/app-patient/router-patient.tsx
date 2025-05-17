import PagePatient from "./page-patient";

export function RouterPatient() {
  return [
    {
      path: "/patient/:id/:selectedType?/:selectedId?/:mode?",
      element: <PagePatient />
    }
  ];
}
