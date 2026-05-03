import { useState } from 'react'
import * as S from './styles'

type Props = {
  titulo: string
  prioridade: string
  status: string
  descricao: string
}
const Tarefa = ({ descricao, prioridade, status, titulo }: Props) => {
  const [estaEditando, setEstaEditando] = useState(false)
  const [animando, setAnimando] = useState<string | null>(null)

  const acionar = (variante: string, callback?: () => void) => {
    setAnimando(variante)
    setTimeout(() => {
      setAnimando(null)
      callback?.()
    }, 1200)
  }
  return (
    <S.Card>
      <S.Titulo>{titulo}</S.Titulo>
      <S.Tag>{prioridade}</S.Tag>
      <S.Tag>{status}</S.Tag>
      <S.Descricao value={descricao} />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <S.Botao
              $variant="secondary"
              $active={animando === 'secondary'}
              onClick={() => acionar('secondary', () => setEstaEditando(false))}
            >
              Salvar
            </S.Botao>

            <S.Botao
              $variant="danger"
              $active={animando === 'danger'}
              onClick={() => acionar('danger', () => setEstaEditando(false))}
            >
              Cancelar
            </S.Botao>
          </>
        ) : (
          <>
            <S.Botao
              $variant="primary"
              $active={animando === 'primary'}
              onClick={() => acionar('primary', () => setEstaEditando(true))}
            >
              Editar
            </S.Botao>
            <S.Botao
              $variant="danger"
              $active={animando === 'danger'}
              onClick={() => acionar('danger')}
            >
              Remover
            </S.Botao>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa

// { condicao ? tratamento verdadeiro: exceção }

// if (condicao) {
//   tratamento verdadeiro
// } else {
//   exceção
// }

// {idade >= 18 ? 'E maior de idade ' : 'E menor de idade'}
