import { ITask } from "@/lib/types";

export interface IPromodoroContext {
  tasks: ITask[]
}

export type PROMODORO_ACTIONS =
  | { type: "setNewTask"; payload: ITask['taskName'] }
  | { type: "removeTask"; payload: ITask['taskId'] }
  | { type: "editTask"; payload: ITask }
  | { type: "addTaskPromodoro"; payload: ITask['taskId'] }
