export function Teste({ mess, handleUpdateTarefas }) {

  function handleClick() {
    handleUpdateTarefas()
  }

  return (
    <>
      <h2>Teste</h2>
      <button onClick={handleClick}>Botão</button>
    </>
  )
}