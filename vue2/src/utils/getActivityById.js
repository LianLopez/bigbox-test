import axios from "axios";

export default async function getActivityById(id) {
  try {
    const url = import.meta.env.VITE_BACKEND_URL;
    const data = (await axios.get(`${url}/activity/${id}`)).data;
    const activity = {
      ...data,
      activity: JSON.parse(data.activity),
    };
    return activity;
  } catch (err) {
    console.log(err);
    return null;
  }
}
