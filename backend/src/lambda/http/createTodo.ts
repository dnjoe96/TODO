import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../helpers/dataAccess/todosAcess'
import { todoBuilder } from '../../helpers/dataAccess/todos'

// import { createTodo } from '../../businessLogic/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    
    const todo = todoBuilder(newTodo, event)
    // const createdTodo = await createTodo(todo)
    await createTodo(todo)

    return {
      statusCode: 201,
      body: JSON.stringify({
        // createdTodo
        item: todo
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
