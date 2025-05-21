import React, { useState } from 'react'
import ActionForm from './components/ActionForm'
import ActionList from './components/ActionList'

export default function App() {
  const [actions, setActions] = useState([])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Action Tracker</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ActionForm setActions={setActions} />
          <ActionList actions={actions} setActions={setActions} />
        </div>
      </div>
    </div>
  )
}
