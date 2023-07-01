import { useState } from 'react';
import '../src/css/cadastro_tarefas.css';

// eslint-disable-next-line react/prop-types
function CadastroTarefas() {
	const [data, setData] = useState("")
	const [time, setTime] = useState("")
	const [text, setText] = useState("")

	function getData() {
		console.log('ENVIOU')

		const day = data.split("-")[2]
		const mes = data.split("-")[1]
		const ano = data.split("-")[0]
		const dataFinal = day + "/" + mes + "/" + ano

		const dataTarefa = {
			data: dataFinal,
			time,
			text
		}

		// handleUpdateTarefas(dataTarefa)


		// const storage = localStorage.getItem("dataTarefa")
		// if (!storage) {
		// 	localStorage.setItem("dataTarefa", JSON.stringify(Object.values(dataTarefa)));
		// } else {
		// 	const storageFormat = JSON.parse(storage)
		// 	storageFormat.push(dataTarefa)
		// 	localStorage.setItem("dataTarefa", JSON.stringify(storageFormat));
		// 	console.log(storageFormat)
		// }
	}

	return (
		<>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" style={{ width: '600px', height: '400px' }}>
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Adicionar Tarefa</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
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
						</div>
						<div className="modal-footer">
							<button
								type="button"
								onClick={getData}
								form='idForm'
								className="btn btn-success"
								// data-bs-dismiss="modal"
							>
								Tarefa Importante
							</button>
							<button
								type="button"
								onClick={getData}
								form='idForm'
								className="btn btn-primary"
								// data-bs-dismiss="modal"
							>
								Salvar Tarefa
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CadastroTarefas