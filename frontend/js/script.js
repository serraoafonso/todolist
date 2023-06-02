const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('.input-task')

const fetchTaks = async()=>{//ao buscar dados é sempre uma funcao assincrona, nao sabemos quanto tempo pode demorar
  const response = await fetch('http://localhost:3333/tasks');
  const tasks =  await response.json()//tira o json da resposya
  return tasks;
}


const addTask = async (event)=>{
  event.preventDefault();
  
  const task = {title : inputTask.value}
  
  await fetch('http://localhost:3333/tasks', {
    method: 'post', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  })
  loadTaks()

  inputTask.value = ''
}


const createElement =(tag, innerText = '', innerHTML = '')=>{//faz o valor padrao do inner text vazio
  const element = document.createElement(tag);
  if(innerText){
  element.innerText = innerText
  };
  if(innerHTML){
  element.innerHTML = innerHTML;
  }
  return element
}


const createSelect = (value)=>{
    const options = `<option value="Pendente">
    Pendente
  </option>
  <option value="em andamento">
    Em adamento
  </option>
  <option value="concluida">
    Concluída
  </option>`

    const select = createElement('select', '', options);

    select.value = 'concluida'

    return select
}


const createRow = (task)=>{
  const {id, title, created_at, status} = task;
 
  const tr = document.createElement('tr');
  const tdTitle = createElement('td', 'Título da task')
  const tdCreatedAt = createElement('td', formatDate(created_at) );
  const tdStatus = createElement('td');
  const tActions = createElement('td');
  const select = createSelect(status);

select.addEventListener('change', ({target})=>updateTask({...task, status:target.value}))//pega todas os elementos de task e manda um por um

  const editBtn = createElement('button','', "<span class='material-symbols-outlined'>edit</span>");
  const deleteBtn = createElement('button','', "<span class='material-symbols-outlined'>delete</span>");
 

  tdStatus.appendChild(select)
 
  const editForm = createElement('form');
  const editInput = createElement('input')

  editInput.value = title;

  editForm.appendChild(editInput)
  
  editBtn.classList.add('btn-action')


  editForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    updateTask({id, title:editInput.value, status: status})//posso so deixar so um status
  })

  editBtn.addEventListener('click', ()=>{
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });

  deleteBtn.classList.add('btn-action')

  deleteBtn.addEventListener('click', ()=>deleteTask(id))

  tActions.appendChild(editBtn)
  tActions.appendChild(deleteBtn)

  tr.appendChild(tdTitle)
  tr.appendChild(tdCreatedAt)//cria novo filho
  tr.appendChild(tdStatus);
  tr.appendChild(tActions)

  return tr;
  
}


const loadTaks = async()=>{
    const tasks = await fetchTaks()//busca o valor da fetch tasks

tbody.innerHTML = ''

    tasks.forEach((task)=>{
        const tr = createRow(task);
        tbody.appendChild(tr);
    })
}


const deleteTask =async(id)=>{
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'delete'
  })
  loadTaks()
}


const formatDate = (dateUTC)=>{
  const options = {dateStyle: 'long', timeStyle: 'short'} 
  const date = new Date(dateUTC).toLocaleString('pt-pt', options);
  return date
}


const updateTask = async ({id, title, status})=>{

  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'put',
    headers: {'Content-type' : 'application/json'},
    body: JSON.stringify({title, status})
  })
  loadTaks()
}




addForm.addEventListener('submit', addTask)


loadTaks()