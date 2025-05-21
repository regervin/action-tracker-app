import React, { useState } from 'react'
import { FaCheck, FaTrash, FaEdit, FaSave } from 'react-icons/fa'

export default function ActionList({ actions, setActions }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const toggleComplete = (id) => {
    setActions(prev =>
      prev.map(action =>
        action.id === id ? { ...action, completed: !action.completed } : action
      )
    )
  }

  const deleteAction = (id) => {
    setActions(prev => prev.filter(action => action.id !== id))
  }

  const startEdit = (action) => {
    setEditingId(action.id)
    setEditForm(action)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const saveEdit = (id) => {
    setActions(prev =>
      prev.map(action =>
        action.id === id ? { ...editForm } : action
      )
    )
    setEditingId(null)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Action</th>
            <th className="p-3 text-left">How It Will Be Accomplished</th>
            <th className="p-3 text-left">Who Will Do It</th>
            <th className="p-3 text-left">When</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {actions.map(action => (
            <tr 
              key={action.id}
              className={`border-b ${
                action.completed ? 'bg-green-50' : 'bg-white'
              }`}
            >
              {editingId === action.id ? (
                <>
                  <td className="p-3">
                    <input
                      type="text"
                      name="action"
                      value={editForm.action}
                      onChange={handleEditChange}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-3">
                    <textarea
                      name="howTo"
                      value={editForm.howTo}
                      onChange={handleEditChange}
                      className="w-full p-1 border rounded"
                      rows="2"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      name="assignedTo"
                      value={editForm.assignedTo}
                      onChange={handleEditChange}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      name="dueDate"
                      value={editForm.dueDate}
                      onChange={handleEditChange}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={editForm.completed}
                      onChange={(e) => setEditForm(prev => ({ ...prev, completed: e.target.checked }))}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => saveEdit(action.id)}
                      className="text-green-500 hover:text-green-600 mx-1"
                    >
                      <FaSave />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className={`p-3 ${action.completed ? 'line-through' : ''}`}>
                    {action.action}
                  </td>
                  <td className={`p-3 ${action.completed ? 'line-through' : ''}`}>
                    {action.howTo}
                  </td>
                  <td className={`p-3 ${action.completed ? 'line-through' : ''}`}>
                    {action.assignedTo}
                  </td>
                  <td className={`p-3 ${action.completed ? 'line-through' : ''}`}>
                    {action.dueDate}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleComplete(action.id)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <FaCheck />
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => startEdit(action)}
                      className="text-blue-500 hover:text-blue-600 mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteAction(action.id)}
                      className="text-red-500 hover:text-red-600 mx-1"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
