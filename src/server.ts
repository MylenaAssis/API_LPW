import fastify from 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod'

const app = fastify();

const users = [
    { id: '1', name: 'Joao', email: 'joao@unifoa.edu.br', phone: '24999000500' },
    { id: '2', name: 'Pedro', email: 'pedro@unifoa.edu.br', phone: '24999000501'},
    { id: '3', name: 'Maria', email: 'maria@unifoa.edu.br', phone: '24999000502'},
    { id: '4', name: 'Rosa', email: 'rosa@unifoa.edu.br', phone: '24999000503'}
]

//rota com metodo get para listar usuários
app.get('/users', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send(users)
})

//rota para listar usuario pelo id
app.get('/users/:id', (request: FastifyRequest, reply:FastifyReply) => {
    // {id} desestruturando o id do request.params
    //necessario instalar pacote zod com 'npm i zod' na pasta do projeto
    const paramSchema = z.object({
        id: z.string()
    })

    const { id } = paramSchema.parse(request.params)

    const userId = users.filter(users => users.id === id)
    return reply.status(200).send(userId)
})

app.listen({
    port: 3333,
}).then (() => {
    console.log('HTTP server runing on http://localhost:33333')
})



