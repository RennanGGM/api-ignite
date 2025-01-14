# 📝 API REST - Gerenciador de Tarefas

Uma API REST simples para gerenciar tasks, desenvolvida com **JSON Server** e testada com **Insomnia**. Essa API suporta operações CRUD completas, incluindo o método **PATCH** para atualizações parciais.

---

## • Funcionalidades

- **Criar Tarefa**: Adiciona novas tarefas com título, descrição e data de criação das tasks.
- **Listar Tarefas**: Retorna todas as tarefas cadastradas.
- **Atualizar Tarefa**: Modifica dados de uma tarefa existente (parcial e completamente) 
- **Excluir Tarefa**: Remove tarefas do sistema.

---

## • Tecnologias Utilizadas

- **JSON Server**: Para criar rapidamente uma API REST simulada.
- **Insomnia**: Para testar e validar endpoints.
- **Node.js**: Ambiente para executar o JSON Server.
- 

---

## • Endpoints

### **1. Listar Todas as Tarefas**
**GET** `/tasks`

**Resposta:**
```json
[
  {
    "id": 1,
    "title": "Work,
    "description": "Programar",
    "completed_at": "null"
    "created_at": "null"
    "updated_at": "null"
  }
]
