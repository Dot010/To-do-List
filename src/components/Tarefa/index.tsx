import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as S from './styles'

import * as enums from '../../utils/enums/tarefa'

import { remover, editar } from '../../store/reducers/tarefa'
import TarefaClass from '../../models/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [animando, setAnimando] = useState<string | null>(null)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

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
      <S.Tag paramentro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag paramentro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <S.Botao
              $variant="secondary"
              $active={animando === 'secondary'}
              onClick={() =>
                acionar('secondary', () => {
                  // ✅ block body
                  dispatch(
                    editar({
                      descricao,
                      id,
                      prioridade,
                      status,
                      titulo
                    })
                  )
                  setEstaEditando(false)
                })
              }
            >
              Salvar
            </S.Botao>

            <S.Botao
              $variant="danger"
              $active={animando === 'danger'}
              onClick={() =>
                acionar('danger', () => {
                  cancelarEdicao()
                })
              }
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
              onClick={() => {
                acionar('danger')
                dispatch(remover(id))
                setEstaEditando(false)
                setDescricao(descricaoOriginal)
              }}
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
