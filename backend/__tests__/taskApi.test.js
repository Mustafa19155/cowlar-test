const request = require("supertest");
const app = require("..");
const Task = require("../models/task");

describe("Task API", () => {
  afterEach(async () => {
    await Task.deleteMany({});
  });

  test("should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ task: "New Task" });

    expect(response.status).toBe(200);
    expect(response.body.task).toBe("New Task");
  });

  test("should get all tasks", async () => {
    await Task.create({ task: "Task 1" });
    await Task.create({ task: "Task 2" });

    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].task).toBe("Task 1");
    expect(response.body[1].task).toBe("Task 2");
  });

  test("should update a task", async () => {
    const task = await Task.create({ task: "Task 1" });

    const response = await request(app)
      .put(`/api/tasks/${task._id}`)
      .send({ completed: true });

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(false);
  });

  test("should delete a task", async () => {
    const task = await Task.create({ task: "Task 1" });

    const response = await request(app).delete(`/api/tasks/${task._id}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe("Task deleted successfully");
  });
});
