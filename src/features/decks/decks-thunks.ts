import { Dispatch } from 'redux'
import { decksAPI, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setStatus } from '../../app/app-reducer.ts'
import axios from 'axios'

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
    let errorMessage: string

    if (axios.isAxiosError(error)) errorMessage = error.response ? `Axios server response error: ${error.response.data.errorMessages[0].message}` : `Axios client error: ${error.message}`
    else errorMessage = `Native error: ${(error as { message: string }).message}`

    console.log(errorMessage)
  }
}