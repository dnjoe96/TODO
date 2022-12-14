// import { createLogger } from '../utils/logger'
import { TodoItem } from '../../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { todoIndex, todosTable, docClient } from '../adapters/dynamodb'

// const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export async function createTodo(todo: TodoItem): Promise<TodoItem> {
  await docClient.put({
    TableName: todosTable,
    Item: todo
  }).promise()

  return todo
}


export async function getAllTodosByUserId(userId: string): Promise<TodoItem[]> {
  const result = await docClient.query({
    TableName: todosTable,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }).promise()
  
  return result.Items as TodoItem[]
}


export async function getTodosById(todoId: string): Promise<TodoItem> {
  const result = await docClient.query({
    TableName: todosTable,
    IndexName: todoIndex,
    KeyConditionExpression: 'todoId = :todoId',
    ExpressionAttributeValues: {
      ':todoId': todoId
    }
  }).promise()

  const items = result.Items
  if (items.length !== 0) return items[0] as TodoItem
  
  return null
}



export async function updateTodoById(todo: TodoItem): Promise<TodoItem> {
  const result = await docClient.update({
    TableName: todosTable,
    Key: {
      userId: todo.userId,
      todoId: todo.todoId
    },
    UpdateExpression: 'set attachmentUrl = :attachmentUrl',
    ExpressionAttributeValues: {
      ':attachmentUrl': todo.attachmentUrl
    }
  }).promise()
  
  return result.Attributes as TodoItem
}


export async function updateTodo(updatedTodo: UpdateTodoRequest,todo: TodoItem): Promise<TodoItem> {
  const result = await docClient.update({
    TableName: todosTable,
    Key: {
      userId: todo.userId,
      todoId: todo.todoId
    },
    UpdateExpression: 'set dueDate = :dueDate, done = :done',
    ExpressionAttributeValues: {
        ":dueDate": updatedTodo.dueDate,
        ":done": updatedTodo.done
      }
  }).promise()

  return result.Attributes as TodoItem
}


export async function DeleteTodoById(todo: TodoItem): Promise<number> {
  await docClient.delete({
    TableName: todosTable,
    Key: {
      userId: todo.userId,
      todoId: todo.todoId
    },
  }).promise()

  return 1
}
