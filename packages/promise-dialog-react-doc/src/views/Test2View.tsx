import React from 'react'
import { useDialog } from 'promise-dialog-react'

const Test1View = () => {
  const { onConfirm, confirm, cancel } = useDialog()
  const [count, setCount] = React.useState(0)

  onConfirm(() => {
    confirm(count)
  })

  function diyOnConfrim() {
    confirm(count)
  }

  function diyOnCancel() {
    cancel()
  }

  return (
    <div className="">
      Test1:count {count}
      <button onClick={() => setCount(count + 1)}>add count</button>
      <button onClick={diyOnConfrim}>确认</button>
      <button onClick={diyOnCancel}>取消</button>
    </div>
  )
}

Test1View.dialogify = {
  title: '测试标题',
  width: 1280
}

export default Test1View
