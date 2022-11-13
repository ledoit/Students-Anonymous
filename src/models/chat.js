
export class Chat {

  constructor({ id, users }) {
    this.id = id;
    // users is an array of users involved in the chat
    this.users = users; 
  }

  toJson() {
    return {
      users: this.users,
    }
  }

  static fromFirebase(docSnap) {
    const data = docSnap.data()

    return new Chat({
      id: docSnap.id,
      users: data.users,
    });
  }
}