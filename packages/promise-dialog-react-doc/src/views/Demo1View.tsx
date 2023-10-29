import { useDialog } from 'promise-dialog-react'
import Test1View from './Test1View'
import Test2View from './Test2View'

const Demo1View = () => {
  const { dialog } = useDialog()
  async function openTest1ByComponent() {
    const result = await dialog(Test1View, { message: '这是传进来的props' })
    console.log('test1 resutl:', result)
  }
  async function openTest1ByReactNode() {
    const result = await dialog(<Test1View message="这是传进来的props"></Test1View>)
    console.log('test1 resutl:', result)
  }
  async function openTest2ByReactNodeWithDialogify() {
    const result = await dialog(<Test2View></Test2View>)
    console.log('test2 result:', result)
  }

  async function openTest2ReactNodeWithDIYFooter() {
    const result = await dialog(<Test2View></Test2View>, { footer: null })
    console.log('test2 result:', result)
  }
  return (
    <div>
      <button onClick={openTest1ByComponent}>传组件+默认footer</button>
      <button onClick={openTest1ByReactNode}>传ReactNode+默认footer</button>
      <button onClick={openTest2ByReactNodeWithDialogify}>传组件+dialogify</button>
      <button onClick={openTest2ReactNodeWithDIYFooter}>传组件+自定义footer</button>
    </div>
  )
}

export default Demo1View
