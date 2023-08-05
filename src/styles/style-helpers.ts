const integrities: Record<string, string> = {
  "5.3.1":
    "sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
};
const currentVersion = "5.3.1";

export function getBootstrapStyle(version = currentVersion) {
  if (!(version in integrities)) {
    console.error("Bootstrap version not found in integrities: ", version);
  }

  return `<link 
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" 
    integrity="${integrities[version]}"
    rel="stylesheet"
    crossorigin="anonymous"
    >`;
}
