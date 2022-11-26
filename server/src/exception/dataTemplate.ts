
export class DataTemplate {
  name;
  email;
  id;
  constructor(model: any) {
    this.name = model.name
    this.email = model.email;
    this.id = model._id;
  }
};