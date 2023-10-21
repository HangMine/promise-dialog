import { useDialog } from 'promise-dialog-react'
import Test1View from './Test1View'
import Test2View from './Test2View'

const Demo1View = () => {
  const { dialog } = useDialog()
  async function openTest1ByComponent() {
    const result = await dialog(Test1View)
    console.log('test1 resutl:', result)
  }
  async function openTest1ByVnode() {
    const result = await dialog(<Test1View message="这是传进来的props"></Test1View>)
    console.log('test1 resutl:', result)
  }
  async function openTest2ByComponentWithDialogify() {
    const result = await dialog(Test2View)
    console.log('test1 resut2:', result)
  }

  async function openTest2ByComponentWithDIYFooter() {
    const result = await dialog(Test2View, {}, { footer: null })
    console.log('test1 resut2:', result)
  }
  return (
    <div>
      <button onClick={openTest1ByComponent}>传组件+默认footer</button>
      <button onClick={openTest1ByVnode}>传VNode+默认footer</button>
      <button onClick={openTest2ByComponentWithDialogify}>传组件+dialogify</button>
      <button onClick={openTest2ByComponentWithDIYFooter}>传组件+自定义footer</button>
    </div>
  )
}

export default Demo1View
