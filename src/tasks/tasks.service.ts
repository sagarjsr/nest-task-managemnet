import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task | null> {
    const result = await this.tasks.find((task) => task.id === id);

    if (result) {
      return result;
    }

    return null;
  }

  async deleteTaskById(id: string): Promise<Task | null> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      // Found a task with the specified ID, remove it from the array
      const deletedTask = this.tasks.splice(taskIndex, 1)[0];
      return deletedTask;
    }

    return null; // Return null if no task was found with the given ID
  }
}
