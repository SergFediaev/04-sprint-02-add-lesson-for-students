import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setStatus } from '../../app/app-reducer.ts'
import { handleNetworkError } from '../../common/utils/handle-error.ts'

export const fetchDecksTC = () => (dispatch: Dispatch) => {
  dispatch(setStatus('loading'))

  decksAPI.fetchDecks().then((res) => {
    dispatch(setDecksAC(res.data.items))
    dispatch(setStatus('succeeded'))
  })
}

export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}

export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    // throw Error('Native error thrown!')
    const response = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(response.data))
  } catch (error) {
    handleNetworkError(error, dispatch)
  }
}