import { useState } from 'react'
import Crud from './Crud'

import Expense from './assets/Income1'
import IncomeTracker from './Income'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     
    <IncomeTracker/>
    </div>
  )
}

export default App
