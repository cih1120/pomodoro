export type TimerMode = 'focus' | 'shortBreak' | 'longBreak'
export type TimerStatus = 'default' | 'running' | 'pause'
export interface ITask {
  taskId: string;
  taskName: string;
  expectedPromodoros: number;
  currentPromodoros: number;
  createdAt: Date;
}