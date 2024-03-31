## Funcionalidades
- [x] Criação de uma task
- [x] Listagem de todas as tasks
- [x] Atualização de uma task pelo `id`
- [x] Remover uma task pelo `id`
- [x] Marcar pelo `id` uma task como completa 
- [x] Importação de tasks em massa por um arquivo CSV
- [x] Validar se as propriedades `title` e `description` das rotas `POST` e `PUT` estão presentes no `body` da requisição.
- [x] Nas rotas que recebem o `/:id`, além de validar se o `id` existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe.

## Rotas e regras de negócio
- [x] `id` - Identificador único de cada task
- [x] `title` - Título da task
- [x] `description` - Descrição detalhada da task
- [x] `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- [x] `created_at` - Data de quando a task foi criada.
- [x] `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

### Rotas
- [x] `POST - /tasks`
    Deve ser possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
    Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.

- [x] `GET - /tasks`
    Deve ser possível listar todas as tasks salvas no banco de dados.
    Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`
    
- [x] `PUT - /tasks/:id`
    Deve ser possível atualizar uma task pelo `id`.
    No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.
    Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.
    Antes de realizar a atualização, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.
    
- [x] `DELETE - /tasks/:id`
    Deve ser possível remover uma task pelo `id`.
    Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.
    
- [x] `PATCH - /tasks/:id/complete`
    Deve ser possível marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado “normal”.
    Antes da alteração, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.

## Tecnologias
- JavaScript
- Node.js
- [CSV Parser for Node.js](https://csv.js.org/parse/)

## Rodando
Para rodar a API:
```bash
npm run dev
```
Para importar tasks via CSV:
```bash
npm run csv
```
