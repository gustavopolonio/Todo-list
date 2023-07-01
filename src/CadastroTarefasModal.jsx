import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function CadastroTarefasModal({ show, handleClose, handleUpdateTarefas }) {
  // Criando os 3 estados para armazenar os valores dos 3 inputs
  const [data, setData] = useState("")
	const [time, setTime] = useState("")
	const [text, setText] = useState("")

  function getData(isImportant) { // Função para pegar os valores dos inputs
		const day = data.split("-")[2]
		const mes = data.split("-")[1]
		const ano = data.split("-")[0]
		const dataFinal = day + "/" + mes + "/" + ano // Data formatada

    // Transformando a data e o horário em timestamp (tempo em milisegundos)
    const dateInTimestamp = Date.parse(`${data} ${time}`)

		const dataTarefa = { // Criando a nova tarefa com os dados dos inputs
      id: Date.now(),
			data: dataFinal,
			horario: time,
			tarefa: text,
      dateInTimestamp,
      isImportant,
      isFinished: false
		}

    // Salvando a nova tarefa no estado
		handleUpdateTarefas(dataTarefa)

    // Fechar o modal do bootstrap
    handleClose()
	}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="idForm">
          <div className="mb-3">
            <label className="form-label">Data:</label>
            <input 
              type="date" 
              className="form-control"
              onChange={(e) => setData(e.target.value)}
              value={data}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Horário:</label>
            <input 
              type="time" 
              className="form-control"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tarefa:</label>
            <input 
              type="text" 
              className="form-control"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => getData(true)} className="btn btn-success">
          Tarefa Importante
        </Button>
        <Button onClick={() => getData(false)} className="btn btn-primary">
          Salvar Tarefa
        </Button>
      </Modal.Footer>
    </Modal>
  )
}