import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAllTask(): Promise<any> {
    return this.tasksService.getAllTasks();
  }
  @Get('/:id')
  async getTaskById(@Param() param): Promise<any> {
    console.log('first', param.id);

    return this.tasksService.getTaskById(param.id);
  }

  @Delete('/:id')
  async deleteTaskById(@Param() param): Promise<any> {
    return this.tasksService.deleteTaskById(param.id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }
}
