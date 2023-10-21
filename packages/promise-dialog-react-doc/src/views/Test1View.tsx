import React from 'react'
import { useDialog } from 'promise-dialog-react'

interface Props {
  message?: string
}

const Test1View = (props: Props) => {
  const { message = 'default message' } = props
  const { onConfirm } = useDialog()
  const [count, setCount] = React.useState(0)

  onConfirm(({ confirm }) => {
    confirm(count)
  })

  return (
    <div className="">
      <div>props message: {message}</div>
      Test1:count {count}
      <button onClick={() => setCount(count + 1)}>add count</button>
    </div>
  )
}

export default Test1View
