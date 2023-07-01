import { useEffect, useState } from 'react';
// import CadastroTarefas from './CadastroTarefas';
// import { dados } from './listagem';
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
    const tarefasStoraged = localStorage.getItem("tarefas")
    const tarefasFormatadas = JSON.parse(tarefasStoraged)
    setTarefas(tarefasFormatadas)
  }, [])

  function handleClose() {
    setShowModal(false)
  }

  function handleShow() {
    setShowModal(true)
  }
  
  function updateTarefas(tarefa) {
    const sortAux = [...tarefas, tarefa]

    const sortedTarefas = sortTarefas(sortAux)

    setTarefas(sortedTarefas)

    localStorage.setItem("tarefas", JSON.stringify(sortedTarefas))
  }

  function sortTarefas(sortAux) {
    // Ordena pela data/horário
    sortAux.sort((a,b) => {
      return a.dateInTimestamp - b.dateInTimestamp
    })

    // Ordena se é importante
    // sortAux.sort((a,b) => {
    //   return b.isImportant - a.isImportant
    // })

    return sortAux
  }

  function deleteTarefa(id) {
    const newTarefas = tarefas.filter(tarefa => tarefa.id !== id)
    setTarefas(newTarefas)

    localStorage.setItem("tarefas", JSON.stringify(newTarefas))
  }

  // function markAsImportant(id) {
  //   const newTarefas = tarefas.map(tarefa => {
  //     if (tarefa.id !== id) {
  //       return tarefa
  //     } else {
  //       return {
  //         ...tarefa,
  //         isImportant: !tarefa.isImportant
  //       }
  //     }
  //   })

  //   const sortedTarefas = sortTarefas(newTarefas)
  //   setTarefas(sortedTarefas)

  //   localStorage.setItem("tarefas", JSON.stringify(sortedTarefas))
  // }

  function markAsFinished(id) {
    console.log(id)
    const newTarefas = tarefas.map(tarefa => {
      if (tarefa.id !== id) {
        return tarefa
      } else {
        return {
          ...tarefa,
          isFinished: true
        }
      }
    })

    setTarefas(newTarefas)
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