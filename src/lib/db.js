import Dexie from "dexie";

export const db = new Dexie("Evaluation");
db.version(1).stores({
  students: "++id, name",
  topics: "++id, name",
  schedules: "++id, name, student",
});
