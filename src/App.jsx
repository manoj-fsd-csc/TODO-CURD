import React,{useState} from 'react'
import All from './components/All'



function App() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Office Task-1",
      description: "This is the description for My First Task",
      status: false
    },
    {
      id: 2,
      title: "Office Task-2",
      description: "This is the description for My Second Task",
      status: false
    },
    {
      id: 3,
      title: "Office Task-3",
      description: "This is the description for My Third Task",
      status: false
    }
  ])

  let [completed,setCompleted]=useState("All")

  return <>
  <div className="container">
  <All data={data} setData={setData} completed={completed} setCompleted={setCompleted}/>
  </div>
  </>
}

export default App