export default class Pojo {
  id: string = "";
  created_at: Date = new Date();
  updated_at: Date = new Date();
  last_user: string = "";

  getObjectName(): string {
    return "pojo";
  }

  get uuid(): string {
    return this.getObjectName() + "." + this.id;
  }
}
