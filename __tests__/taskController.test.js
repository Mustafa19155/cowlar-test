const TaskController = require("../controllers/task");
const Task = require("../models/task");

describe("Task Controller", () => {
  describe("getAllTasks", () => {
    test("should get all tasks", async () => {
      const mockTasks = [{ task: "Task 1" }, { task: "Task 2" }];
      Task.find = jest.fn().mockResolvedValue(mockTasks);
      const mockReq = {};
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      await TaskController.getAllTasks(mockReq, mockRes, mockNext);

      expect(Task.find).toHaveBeenCalled();
      expect(mockRes.send).toHaveBeenCalledWith(mockTasks);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("createTask", () => {
    test("should create a new task", async () => {
      const mockTask = { task: "New Task" };
      const mockReq = { body: { task: "New Task" } };
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      Task.prototype.save = jest.fn().mockResolvedValue({ task: "New Task" });

      await TaskController.createTask(mockReq, mockRes, mockNext);
      expect(Task.prototype.save).toHaveBeenCalled();
      expect(mockRes.send).toHaveBeenCalledWith(mockRes.send.mock.calls[0][0]);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("updateTask", () => {
    test("should update a task", async () => {
      const mockTaskId = "123";
      const mockUpdatedTask = { task: "Updated Task" };
      Task.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedTask);
      const mockReq = { params: { id: mockTaskId }, body: { completed: true } };
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      await TaskController.updateTask(mockReq, mockRes, mockNext);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(mockTaskId, {
        completed: true,
      });
      expect(mockRes.send).toHaveBeenCalledWith(mockUpdatedTask);
      expect(mockNext).not.toHaveBeenCalled();
    });

    test("should handle task not found", async () => {
      const mockTaskId = "123";
      Task.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      const mockReq = { params: { id: mockTaskId }, body: { completed: true } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const mockNext = jest.fn();

      await TaskController.updateTask(mockReq, mockRes, mockNext);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(mockTaskId, {
        completed: true,
      });
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith("Task not found");
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("deleteTask", () => {
    test("should delete a task", async () => {
      const mockTaskId = "123";
      Task.findByIdAndDelete = jest.fn().mockResolvedValue(true);
      const mockReq = { params: { id: mockTaskId } };
      const mockRes = { send: jest.fn() };
      const mockNext = jest.fn();

      await TaskController.deleteTask(mockReq, mockRes, mockNext);

      expect(Task.findByIdAndDelete).toHaveBeenCalledWith(mockTaskId);
      expect(mockRes.send).toHaveBeenCalledWith("Task deleted successfully");
      expect(mockNext).not.toHaveBeenCalled();
    });

    test("should handle task not found", async () => {
      const mockTaskId = "123";
      Task.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const mockReq = { params: { id: mockTaskId } };
      const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const mockNext = jest.fn();

      await TaskController.deleteTask(mockReq, mockRes, mockNext);

      expect(Task.findByIdAndDelete).toHaveBeenCalledWith(mockTaskId);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith("Task not found");
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
