import '../src/css/ItemTarefa.css';
import deleteImg from "./img/delete.png"
import checkBox from "./img/checkbox.png"
import checkBoxFinished from "./img/checkbox-not-marked.png"


function ItemTarefa({ listagem, handleDeleteTarefa, handleMarkAsFinished }) {
    
    return (
        // Trocando a cor da tarefa importante
        <tr style={listagem.isImportant ? { backgroundColor: 'green' } : {}}>
            <td className="data">
                <h5>{listagem.data}</h5>
            </td>
            <td className="hora">
                <h5>{listagem.horario}</h5>
            </td>
            <td className="tarefa2">
                <h5>{listagem.tarefa}</h5>
            </td>
            <td className='imagem'>
                <img 
                    src={deleteImg}
                    alt="Deletar"
                    width={30}
                    height={30}
                    onClick={() => handleDeleteTarefa(listagem.id)}
                />
                {listagem.isFinished ? (
                    // Checando se a tarefa está finalizada para colocar o botão certo
                    <img 
                        src={checkBox}
                        alt="Checkbox"
                        width={30}
                        height={30}
                    />
                ) : (
                    <img 
                        src={checkBoxFinished}
                        alt="Checkbox"
                        width={30}
                        height={30}
                        onClick={() => handleMarkAsFinished(listagem.id)}
                    />
                )}
                
            </td>
        </tr>
    )
}

export default ItemTarefa
