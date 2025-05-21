import React, { useState } from 'react'

export default function ActionForm({ setActions }) {
  const [formData, setFormData] = useState({
    department: '',
    responsible: '',
    date: '',
    action: '',
    howTo: '',
    assignedTo: '',
    dueDate: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.action.trim()) return

    const newAction = {
      id: Date.now(),
      ...formData,
      completed: false,
      created_at: new Date().toISOString()
    }

    setActions(prev => [newAction, ...prev])
    setFormData(prev => ({ ...prev, action: '', howTo: '', assignedTo: '', dueDate: '' }))
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Department Name</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Responsible Person</label>
          <input
            type="text"
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Action</label>
          <input
            type="text"
            name="action"
            value={formData.action}
            onChange={handleChange}
            placeholder="Add new action item..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">How It Will Be Accomplished</label>
          <textarea
            name="howTo"
            value={formData.howTo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Who Will Do It</label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">When It Will Be Done</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Add Action Item
        </button>
      </div>
    </form>
  )
}
