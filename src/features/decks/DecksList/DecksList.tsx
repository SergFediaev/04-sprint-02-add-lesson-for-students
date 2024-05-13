import s from './DecksList.module.css'
import { DeckItem } from './DeckItem/DeckItem.tsx'
import { useFetchDecks } from './useFetchDecks.ts'
import { useAppSelector } from '../../../app/store.ts'
import { LinearLoader } from '../../../common/components/Loader/LinearLoader.tsx'
import { DeckItemSkeleton } from './DeckItem/DeckItemSkeleton.tsx'
import { selectAppStatus } from '../../../app/app-selectors.ts'

export const DecksList = () => {
  const { decks, isLoading } = useFetchDecks()
  const status = useAppSelector(selectAppStatus)

  return (
    <ul className={s.list}>
      {/*{isLoading && <Skeleton height={100} count={10} style={{ marginBottom: '10px' }} />}*/}
      {isLoading && decks.length === 0 && <DeckItemSkeleton count={10} />}
      {status === 'loading' ? <LinearLoader /> : decks.map((deck) => (
        <DeckItem key={deck.id} deck={deck} />
      ))}
    </ul>
  )
}