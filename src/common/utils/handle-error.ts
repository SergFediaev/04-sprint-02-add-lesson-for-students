import { isAxiosError } from 'axios'
import { Dispatch } from 'redux'
import { setAppError } from '../../app/app-reducer.ts'

type ServerError = {
  errorMessages: Array<{ field: string; message: string }>
}

export const handleNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage: string

  if (isAxiosError<ServerError>(error)) errorMessage = error.response ? `Axios server response error: ${error.response.data.errorMessages[0].message}` : `Axios client error: ${error.message}`
  else errorMessage = `Native error: ${(error as Error).message}`

  console.log(errorMessage)
  dispatch(setAppError(errorMessage))
}