import { useState } from 'react'
import { Button, Input } from 'antd'
import './App.css'

const { Search } = Input

function App() {
  let nid,
    pid = ''
  const onSearch = async val => {
    try {
      const stream = await fetch(`/api/book/648623/36478${val ? --val : '00'}.html`)
      const res = await stream.json()
      pid = res.data.pid
      nid = res.data.nid
      document.getElementById('content').innerHTML = res.data.content.replace(/(\n|\r|\r\n|↵)/g, '<hr/>')
    } catch (error) {
      console.log(error)
    }
  }
  onSearch()
  const onNext = async () => {
    try {
      const stream = await fetch(`/api/book/648623/${nid}.html`)
      const res = await stream.json()
      pid = res.data.pid
      nid = res.data.nid
      document.getElementById('content').innerHTML = res.data.content.replace(/(\n|\r|\r\n|↵)/g, '<hr/>')
    } catch (error) {
      console.log(error)
    }
  }
  const onPre = async () => {
    try {
      const stream = await fetch(`/api/book/648623/${pid}.html`)
      const res = await stream.json()
      pid = res.data.pid
      nid = res.data.nid
      document.getElementById('content').innerHTML = res.data.content.replace(/(\n|\r|\r\n|↵)/g, '<hr/>')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <p className='main-content'>
        <Search style={{ marginBottom: '20px' }} placeholder='输入章节...' enterButton='确定' onSearch={onSearch} />
        <Button type='primary' onClick={onPre}>
          上一章
        </Button>
        <Button type='primary' onClick={onNext} style={{ float: 'right' }}>
          下一章
        </Button>
      </p>
      <p id='content' className='main-content'></p>
      <p className='main-content'>
        <Button type='primary' onClick={onPre}>
          上一章
        </Button>
        <Button type='primary' onClick={onNext} style={{ float: 'right' }}>
          下一章
        </Button>
      </p>
    </div>
  )
}

export default App
