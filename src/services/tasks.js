import { api } from "boot/axios";

export function delList(id) {
  return api.delete("/lists/" + id);
}
export function getAllList() {
  return api.get("/lists");
}
export function postList(name) {
  return api.post("/lists", {
    title: name,
  });
}
export function getOneList(id) {
  return api.get("/lists/" + id);
}

export function getAllTasks() {
  return api.get("/tasks");
}
export function postTasks(name, description, list) {
  return api.post("/tasks", {
    title: name,
    description: description,
    list: list,
  });
}
export function getTasksByIdList(id) {
  return api.get("/tasks/" + id);
}

export function getOnetask(id) {
  return api.get("/tasks/id/" + id);
}

export function delTask(id) {
  return api.delete("/tasks/" + id);
}

export function updateOneTask(id, task) {
  console.log(task.name);
  return api.put("/tasks/" + id, {
    title: task.title,
    description: task.description,
    list: task.list,
    done: task.done,
  });
}

export function updateOneTask1(id, task) {
  console.log(task);
  return api.put("/tasks/" + id, {
    title: task.title,
    description: task.description,
    list: task.list._id,
    done: task.done,
  });
}
