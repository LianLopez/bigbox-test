import axios from "axios";

export default async function getActivities({ page, limit }) {
  try {
    const url = import.meta.env.VITE_BACKEND_URL;
    const res = await axios.get(
      `${url}/activity?_page=${page}&_limit=${limit}`
    );
    const data = res.data.map((element) => {
      element.activity = JSON.parse(element.activity);
      return element;
    });
    return {
      activitiesLength: res.headers["x-total-count"],
      data,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
