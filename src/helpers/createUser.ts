import { User } from "../types";

export default async function createUser(data: User) {
  const userData = { name: data.name, email: data.email };
  await fetch(
    `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${data.id}.json`,
    {
      method: "PUT",
      body: JSON.stringify(userData),
    }
  );
}
