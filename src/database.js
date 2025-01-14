import fs from 'node:fs/promises'
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        this.#database = {}
    }

    async init() {
        try {
            const data = await fs.readFile(this.databasePath, 'utf-8')
            this.#database = JSON.parse(data)
        } catch {
             this.#persist()
        }
    }

    async #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2))
    }

    select(table, search = {}) {    
        let data = this.#database[table] ?? [];
    
        if (Object.keys(search).length === 0) {
            return data;
        }
    
        data = data.filter(row => {
            return Object.entries(search).some(([key, value]) => {
                return row[key]?.toLowerCase().includes(value.toLowerCase());
            });
        });
    
        return data;
    }
    
    async insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }
    async update(table, id ,data) {
           if (!this.#database[table]) {
            throw new Error(`Table "${table}" does not exist.`)

        }
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            const row = this.#database[table][rowIndex]
            this.#database[table][rowIndex] = {...this.#database[table][rowIndex][data]}    
            this.#persist()
        }
    }
    async delete(table, id) {   
        if (!this.#database[table]) {
        throw new Error(`Table "${table}" does not exist.`)
        }
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
 }