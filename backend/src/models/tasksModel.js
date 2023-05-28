const connection = require('./conncection')

const getAll = async ()=>{//é assincrona porque tenho de esperar que ela busce os dados
    const [tasks] = await connection.execute('SELECT * FROM tasks');//vou usar docker, podia usar com a mysql worbench instalada
    return tasks/*[0]*/;//meter o tasks dentro de [] é a mesma coisa que retorna a orimeira posição de tasks
}

const createTask = async (task)=>{
const {title} = task
const dateUTC = new Date(Date.now()).toUTCString();
const query = 'INSERT INTO tasks(title, status, created_at) Values (?,?,?)'
const [createTask] = await connection.execute(query, [title,'pendente',dateUTC ])
return{insertID: createTask};
}

const deleteTask = async (id)=>{
  const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id])
  return removedTask
}

const updateTask = async (id, task)=>{
  const {title, status} = task;  
  const [updateTask] = await connection.execute('UPDATE tasks SET title = ?, status = ? where id = ?' [title, status, id ])
  return updateTask
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
}//como vai ter mais que uma funcao crio um objeto que retorna todas elas