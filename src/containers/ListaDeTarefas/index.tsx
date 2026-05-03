import { Container } from './styles'
import Tarefa from '../../components/Tarefa'

const Tarefas = [
  {
    titulo: 'Estudar React',
    descricao: 'Ver aula 1, 2 e 3 do curso de React',
    prioridade: 'Importante',
    status: 'Pendente'
  },
  {
    titulo: 'Pagar conta de luz',
    descricao: 'Boleto vence dia 10/06',
    prioridade: 'Urgente',
    status: 'Concluida'
  },
  {
    titulo: 'Fazer compras',
    descricao: 'Comprar pão, leite e ovos',
    prioridade: 'Importante',
    status: 'Pendente'
  }
]
const ListaDeTarefas = () => (
  <Container>
    <p>2 tarefas maracadas como: &quot;categoria&quot; e &quot;termo&quot;</p>
    <ul>
      {Tarefas.map((t) => (
        <li key={t.titulo}>
          <Tarefa
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

export default ListaDeTarefas
