import axios from "axios";

export async function getTasks() {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/tasks`);

    return res.data;
  } catch (err) {}
}
export async function createTask({ taskText }) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/tasks`,
      {
        task: taskText,
      }
    );
    return res.data;
  } catch (err) {}
}
export async function updateTask({ taskId, completed }) {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/tasks/${taskId}`,
      {
        completed,
      }
    );

    return res.data;
  } catch (err) {}
}
export async function deleteTask({ taskId }) {
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/tasks/${taskId}`);
  } catch (err) {}
}
