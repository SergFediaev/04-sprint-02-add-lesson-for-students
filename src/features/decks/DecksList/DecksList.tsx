import s from './DecksList.module.css'
import { DeckItem } from './DeckItem/DeckItem.tsx'
import { useFetchDecks } from './useFetchDecks.ts'
import { useAppSelector } from '../../../app/store.ts'
import { LinearLoader } from '../../../common/components/Loader/LinearLoader.tsx'

export const DecksList = () => {
  const { decks } = useFetchDecks()
  const status = useAppSelector(state => state.app.status)

  return (
    <ul className={s.list}>
      {status === 'loading' ? <LinearLoader /> : decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </ul>
  )
}