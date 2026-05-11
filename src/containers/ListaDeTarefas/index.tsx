import { Container, Resultado } from './styles'
import Tarefa from '../../components/Tarefa'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFitltradas = itens
    if (termo !== undefined) {
      tarefasFitltradas = tarefasFitltradas.filter(
        (item) =>
          item.titulo.toLowerCase().search(termo.toLocaleLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFitltradas = tarefasFitltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFitltradas = tarefasFitltradas.filter(
          (item) => item.status === valor
        )
      }
      return tarefasFitltradas
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefas(S) encontrada(S) como: todas  ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefas(S) encontrada
(S) como: "${`${criterio}=${valor}`}" ${complementacao}`
    }

    return mensagem
  }

  const tarefas = filtraTarefas()

  const mensagem = exibeResultadoFiltragem(tarefas.length)
  return (
    <Container>
      <Resultado>{mensagem}</Resultado>

      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              prioridade={t.prioridade}
              status={t.status}
              titulo={t.titulo}
            />
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default ListaDeTarefas
