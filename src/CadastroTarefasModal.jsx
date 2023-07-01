// https://react-bootstrap.netlify.app/docs/components/modal
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function CadastroTarefasModal({ show, handleClose, handleUpdateTarefas }) {
  const [data, setData] = useState("")
	const [time, setTime] = useState("")
	const [text, setText] = useState("")

  function getData(isImportant) {
		const day = data.split("-")[2]
		const mes = data.split("-")[1]
		const ano = data.split("-")[0]
		const dataFinal = day + "/" + mes + "/" + ano

    const dateInTimestamp = Date.parse(`${data} ${time}`)

		const dataTarefa = {
      id: Date.now(),
			data: dataFinal,
			horario: time,
			tarefa: text,
      dateInTimestamp,
      isImportant,
      isFinished: false
		}

		handleUpdateTarefas(dataTarefa)

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