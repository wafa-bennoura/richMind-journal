import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Journal() {
  const [entries, setEntries] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`)
      const journalEntries = response.data.filter((entry) => entry.type === 'journal')
      setEntries(journalEntries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
    } catch (error) {
      console.error('Error fetching entries:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      await axios.post(`${API_URL}/tasks`, {
        type: 'journal',
        content: content.trim(),
      })
      setContent('')
      setShowForm(false)
      fetchEntries()
    } catch (error) {
      console.error('Error creating entry:', error)
      alert('Failed to create entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    try {
      await axios.delete(`${API_URL}/tasks/${id}`)
      fetchEntries()
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry. Please try again.')
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Daily Journal</h2>
            <p className="text-gray-600 mt-1">
              Reflect on your financial journey. Write about your actions, decisions, and
              learnings.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ New Entry'}
          </button>
        </div>

        {showForm && (
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Write Your Reflection</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What financial actions did you take today? What did you learn? How did you think like an entrepreneur rather than an employee?"
                className="input-field min-h-[200px] resize-none"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Entry'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContent('')
                    setShowForm(false)
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No journal entries yet. Start your financial journey by writing your first
                reflection!
              </p>
              <button onClick={() => setShowForm(true)} className="btn-primary">
                Write Your First Entry
              </button>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-sm text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}


