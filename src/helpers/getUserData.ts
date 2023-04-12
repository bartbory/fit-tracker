import axios from "axios";
export default async function updateDetails(uid: string | null) {
  let data: object;

  axios
    .get(
      `https://fittracker-60473-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
    )
    .then((response) => {
      data = response.data;
      return { data };
    });
}
