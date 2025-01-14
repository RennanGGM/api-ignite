import  { randomUUID } from 'node:crypto';
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";



const database = new Database()

export const routes = [
    {
        method: 'POST',
        path: buildRoutePath('/task'),
        handler: (req, res) => {
         const { title, description } = req.body || {};
 
         if (!title) {
            return res.writeHead(400).end(
                JSON.stringify({ message: 'title is required' }),
            )
         }

         if (!description) {
            return res.writeHead(400).end(
                JSON.stringify({ message: 'description is required' })
            )
         }

         const task = {
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        }
            database.insert('task', task)
        
            return res.writeHead(201).end()
        
        }
    },
                
    {
        method: 'GET',
        path: buildRoutePath('/task'),
        handler: (req, res) => {
            const { search } = req.query

            
            const filters = search ? {title: search, description: search} : {}    
            const tasks = database.select('tasks', filters)
            
            return res
                .setHeader('Content-Type', 'application/json')
                .end(JSON.stringify(tasks))
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body 

            if(!title && !description) {
                return res.writeHead(400).end(
                    JSON.stringify({ message: 'title or description are required'})
                )
            }

            const [task] = database.select('task', { id })

            if(!task) {
                return res.writeHead(404).end()
            }
            database.update('task', id, {
                title: title ?? task.title,
                description: description ?? task.description,
                updated_at: new Date() 
            })

            return res.writeHead(204).end()
        }
    },
    {
        method:'DELETE',
        path: buildRoutePath('/task/:id'),
        handler:(req, res) => {
            const { id } = req.params

            const [task] = database.select('task', { id })

            if(!task) {
                return res.writeHead(404).end(
                    JSON.stringify({ message: "Registration ID does not exist"})
                )
            }
            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method:'PATCH',
        path: buildRoutePath('/task/:id/complete'),
        handler:(req, res) => {
            const { id } = req.params

            const [task] = database.select('task', { id })

            if(!task) {
                return res.writeHead(404).end()
            }
            const isTaskCompleted = !!task.completed_at
          
            const completed_at = isTaskCompleted ? null : new Date()

            database.update('tasks', id, { completed_at })

            return res.writeHead(204).end()

        }
    }
]


