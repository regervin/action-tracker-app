import React from 'react';
import { useState, useEffect } from 'react'
import { PlusIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline'

function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData')
    return saved ? JSON.parse(saved) : {
      department: '',
      responsiblePerson: '',
      date: new Date().toISOString().split('T')[0]
    }
  })

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('actionItems')
    return saved ? JSON.parse(saved) : []
  })

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem('actionItems', JSON.stringify(items))
    localStorage.setItem('formData', JSON.stringify(formData))
  }, [items, formData])

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addItem = () => {
    setItems([...items, {
      id: Date.now(),
      action: '',
      howToAccomplish: '',
      assignedTo: '',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false
    }])
  }

  const updateItem = (id, field, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Action Items Tracker</h1>
          <button
            onClick={handlePrint}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 print:hidden"
          >
            Print
          </button>
        </div>

        {/* Top Form Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsible Person
            </label>
            <input
              type="text"
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full mb-4">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left">How It Will Be Accomplished</th>
                <th className="px-4 py-2 text-left">Who Will Do It</th>
                <th className="px-4 py-2 text-left">When</th>
                <th className="px-4 py-2 text-center">Done</th>
                <th className="px-4 py-2 text-center print:hidden">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className={`border-t ${item.completed ? 'bg-green-50' : ''}`}>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.action}
                      onChange={(e) => updateItem(item.id, 'action', e.target.value)}
                      className={`w-full px-2 py-1 border rounded ${item.completed ? 'line-through text-gray-500' : ''}`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <textarea
                      value={item.howToAccomplish}
                      onChange={(e) => updateItem(item.id, 'howToAccomplish', e.target.value)}
                      className={`w-full px-2 py-1 border rounded ${item.completed ? 'line-through text-gray-500' : ''}`}
                      rows="2"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.assignedTo}
                      onChange={(e) => updateItem(item.id, 'assignedTo', e.target.value)}
                      className={`w-full px-2 py-1 border rounded ${item.completed ? 'line-through text-gray-500' : ''}`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="date"
                      value={item.dueDate}
                      onChange={(e) => updateItem(item.id, 'dueDate', e.target.value)}
                      className={`w-full px-2 py-1 border rounded ${item.completed ? 'line-through text-gray-500' : ''}`}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`p-1 rounded-full ${
                        item.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      <CheckIcon className={`h-4 w-4 ${
                        item.completed ? 'text-white' : 'text-gray-400'
                      }`} />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center print:hidden">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 print:hidden"
        >
          <PlusIcon className="h-5 w-5 inline-block mr-1" />
          Add Row
        </button>
      </div>
    </div>
  )
}

export default App
