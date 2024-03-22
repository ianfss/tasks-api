import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

            if(!req.body) return res.writeHead(404).end()

            const { title, description } = req.body

            if(!title || !description) {
                return res.writeHead(404).end(
                    JSON.stringify({ message: "Missing required properties." })
                )
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date()
            }

            database.insert('tasks', task)

            return res
                .writeHead(201)
                .end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            if(!title && !description) {
                return res.writeHead(404).end(
                    JSON.stringify({ message: "Missing required properties." })
                )
            }

            const tasks = database.select('tasks', null)

            const task = tasks.find((task) => {
                return task.id === id
            })
            
            if(!task) {
                return res.writeHead(404).end(
                    JSON.stringify({ message: "Task not found." })
                )
            }

            database.update('tasks', id, {
                title,
                description
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params

            const tasks = database.select('tasks', null)

            const task = tasks.find((task) => {
                return task.id === id
            })
            
            if(!task) {
                return res.writeHead(404).end(
                    JSON.stringify({ message: "Task not found." })
                )
            }

            database.complete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            const tasks = database.select('tasks', null)

            const task = tasks.find((task) => {
                return task.id === id
            })
            
            if(!task) {
                return res.writeHead(404).end(
                    JSON.stringify({ message: "Task not found." })
                )
            }

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
]