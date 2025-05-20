import React from 'react';
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import { jsPDF } from 'jspdf'
import JSZip from 'jszip'

export default function ActionItems({ session }) {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [session])

  async function fetchItems() {
    const { data, error } = await supabase
      .from('action_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Error fetching items')
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }

  async function addItem(e) {
    e.preventDefault()
    if (!newItem.trim()) return

    const { error } = await supabase
      .from('action_items')
      .insert([
        {
          title: newItem.trim(),
          user_id: session.user.id,
          completed: false
        }
      ])

    if (error) {
      toast.error('Error adding item')
    } else {
      toast.success('Item added')
      setNewItem('')
      fetchItems()
    }
  }

  async function toggleItem(id, completed) {
    const { error } = await supabase
      .from('action_items')
      .update({ completed: !completed })
      .eq('id', id)

    if (error) {
      toast.error('Error updating item')
    } else {
      fetchItems()
    }
  }

  async function deleteItem(id) {
    const { error } = await supabase
      .from('action_items')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Error deleting item')
    } else {
      toast.success('Item deleted')
      fetchItems()
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Action Items</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .item { margin: 10px 0; }
            .completed { text-decoration: line-through; color: #666; }
          </style>
        </head>
        <body>
          <h1>Action Items</h1>
          ${items.map(item => `
            <div class="item ${item.completed ? 'completed' : ''}">
              [${item.completed ? '✓' : ' '}] ${item.title}
            </div>
          `).join('')}
        </body>
      </html>
    `
    printWindow.document.write(content)
    printWindow.document.close()
    printWindow.print()
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Action Items', 20, 20)
    
    doc.setFontSize(12)
    items.forEach((item, index) => {
      const y = 30 + (index * 10)
      doc.text(`${item.completed ? '☑' : '☐'} ${item.title}`, 20, y)
    })
    
    doc.save('action-items.pdf')
  }

  const exportToODT = async () => {
    const zip = new JSZip()

    // Create content.xml
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                        xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0">
  <office:body>
    <office:text>
      <text:h>Action Items</text:h>
      ${items.map(item => `
        <text:p>${item.completed ? '✓' : '☐'} ${item.title}</text:p>
      `).join('')}
    </office:text>
  </office:body>
</office:document-content>`

    // Create manifest.xml
    const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <manifest:file-entry manifest:media-type="application/vnd.oasis.opendocument.text" manifest:full-path="/"/>
  <manifest:file-entry manifest:media-type="text/xml" manifest:full-path="content.xml"/>
</manifest:manifest>`

    // Add files to the zip
    zip.file('content.xml', content)
    zip.file('META-INF/manifest.xml', manifest)

    // Generate the ODT file
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'action-items.odt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <form onSubmit={addItem} className="flex gap-4 flex-1">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new action item"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>
        
        <div className="flex gap-2 ml-4">
          <button
            onClick={handlePrint}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Print
          </button>
          <button
            onClick={exportToPDF}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            PDF
          </button>
          <button
            onClick={exportToODT}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            ODT
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id, item.completed)}
                className="h-5 w-5 rounded"
              />
              <span className={item.completed ? 'line-through text-gray-500' : ''}>
                {item.title}
              </span>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
