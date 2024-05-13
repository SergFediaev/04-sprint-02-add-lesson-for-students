type MyComponentProps<Type> = {
  items: Type[]
  defaultItem: Type
}

const MyComponent = <Type, >(props: MyComponentProps<Type>) => {
  console.log(props)
  return <p>some content</p>
}

const App = () => {
  const users: User[] = [
    { name: 'Bilbo', age: 111 },
    { name: 'Frodo', age: 33 },
  ]

  return (
    <>
      {/*<MyComponent items={['react', 'typescript']} defaultItem={9} />*/}
      <MyComponent items={['react', 'typescript']} defaultItem={'Test string'} />
      {/*<MyComponent items={users} defaultItem={'JUST STRING'} />*/}
      <MyComponent items={users} defaultItem={{ name: 'Viktor', age: 30 }} />
    </>
  )
}

type User = {
  name: string
  age: number
}