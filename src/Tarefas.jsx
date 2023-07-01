import { useEffect, useState } from 'react';
import ItemTarefa from './ItemTarefa';
import '../src/css/tarefas.css';
import Button from 'react-bootstrap/Button';
import { CadastroTarefasModal } from './CadastroTarefasModal';


function ListaTarefas({ tarefas, handleDeleteTarefa, handleMarkAsFinished }) {
  if (!tarefas) {
    return
  }

  const listaDeTarefas = tarefas.map(tarefa => (
    <ItemTarefa 
      key={tarefa.id}
      listagem={tarefa} 
      handleDeleteTarefa={handleDeleteTarefa}
      handleMarkAsFinished={handleMarkAsFinished}
    />
  ));

  return <>{listaDeTarefas}</>; // Retorne a lista de tarefas mapeada
}

function Tarefas() {
  // const [modal, setModal] = useState(false)
  const [tarefas, setTarefas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Quando a página carrega, pego as tarefas do local storage e salvo no estado
    const tarefasStoraged = localStorage.getItem("tarefas")
    const tarefasFormatadas = JSON.parse(tarefasStoraged)
    setTarefas(tarefasFormatadas || []) // Se já tinham tarefas salvas no local storage: coloca essas tarefas no estado. Se não tinha nenhuma tarefa no storage: cria um array vazio
  }, [])

  function handleClose() {
    // Fechar modal bootatrap
    setShowModal(false)
  }

  function handleShow() {
    // Abrir modal bootatrap
    setShowModal(true)
  }
  
  function updateTarefas(tarefa) { // Quando cria uma nova tarefa, atualiza o estado
    const sortAux = [...tarefas, tarefa] // Atualizando o estado de tarefas

    // Ordenando as tarefas por dia e horário
    const sortedTarefas = sortTarefas(sortAux)

    setTarefas(sortedTarefas)

    // Salvando as tarefas ordenadas no local storage
    localStorage.setItem("tarefas", JSON.stringify(sortedTarefas))
  }

  function sortTarefas(sortAux) {
    // Ordena pela data/horário
    sortAux.sort((a,b) => {
      return a.dateInTimestamp - b.dateInTimestamp
    })

    return sortAux
  }

  function deleteTarefa(id) {
    // Deletando uma tarefa pelo ID dela
    const newTarefas = tarefas.filter(tarefa => tarefa.id !== id)
    setTarefas(newTarefas)

    // Salvando as tarefas no local storage
    localStorage.setItem("tarefas", JSON.stringify(newTarefas))
  }

  function markAsFinished(id) {
    // Marcando uma tarefa como finalizada de acordo com o ID dela
    const newTarefas = tarefas.map(tarefa => {
      if (tarefa.id !== id) {
        // A tarefa analisada não é a que tem que ser marcada
        return tarefa
      } else {
        // A tarefa analisada é a que tem que ser marcada
        return {
          ...tarefa,
          isFinished: true
        }
      }
    })

    setTarefas(newTarefas)
    // Salvando as tarefas no local storage
    localStorage.setItem("tarefas", JSON.stringify(newTarefas))
  }

  return (
    <div>
      {/* <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setModal(!modal) }}>Adicionar Tarefas</button> */}
      {/* {modal && <CadastroTarefas />} */}
      <Button className="btn btn-success" onClick={handleShow}>
        Adicionar Tarefas
      </Button>
      {showModal && (
        <CadastroTarefasModal
          show={showModal}
          handleClose={handleClose}
          handleUpdateTarefas={updateTarefas}
        />
      )}

      <div className="tarefas">
        <table>
          <thead>
            <tr>
              <th className="data">DATA</th>
              <th className="hora">HORÁRIO</th>
              <th className="tarefa">TAREFAS</th>
              <th className="status">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <ListaTarefas 
              tarefas={tarefas} 
              handleDeleteTarefa={deleteTarefa}
              handleMarkAsFinished={markAsFinished}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Tarefas