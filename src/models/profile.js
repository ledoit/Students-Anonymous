export class Profile {

  constructor({ id, name, surname, imageUrl }) {
    this.id = id; // this is the user Id
    this.name = name;
    this.surname = surname;
    this.imageUrl = imageUrl;
  }

  toJson() {
    return {
      name: this.name,
      surname: this.surname,
      imageUrl: this.imageUrl,
    }
  }

  static fromFirebase(docSnap) {
    const data = docSnap.data()

    return new Profile({
      id: docSnap.id,
      name: data.name,
      surname: data.surname,
      imageUrl: data.imageUrl,
    });
  }
}