import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const HABIT_TYPES = [
  'Saved Money',
  'Invested',
  'Learned Something New',
  'Tracked Expenses',
  'Read Financial Content',
  'Networked',
  'Other',
]

export default function Habits() {
  const [habits, setHabits] = useState([])
  const [selectedType, setSelectedType] = useState(HABIT_TYPES[0])
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`)
      const habitEntries = response.data.filter((entry) => entry.type === 'habit')
      setHabits(habitEntries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
    } catch (error) {
      console.error('Error fetching habits:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API_URL}/tasks`, {
        type: 'habit',
        habit_type: selectedType,
        content: notes.trim() || null,
        completed: 1,
      })
      setSelectedType(HABIT_TYPES[0])
      setNotes('')
      setShowForm(false)
      fetchHabits()
    } catch (error) {
      console.error('Error creating habit:', error)
      alert('Failed to track habit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this habit entry?')) return

    try {
      await axios.delete(`${API_URL}/tasks/${id}`)
      fetchHabits()
    } catch (error) {
      console.error('Error deleting habit:', error)
      alert('Failed to delete habit. Please try again.')
    }
  }

  const getHabitStats = () => {
    const stats = {}
    HABIT_TYPES.forEach((type) => {
      stats[type] = habits.filter((h) => h.habit_type === type).length
    })
    return stats
  }

  const stats = getHabitStats()

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Habits Tracker</h2>
            <p className="text-gray-600 mt-1">
              Build financial discipline by tracking your daily habits. Consistency is key.
            </p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : '+ Track Habit'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HABIT_TYPES.slice(0, 4).map((type) => (
            <div key={type} className="card">
              <p className="text-sm text-gray-600 mb-1">{type}</p>
              <p className="text-2xl font-bold text-primary-600">{stats[type] || 0}</p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Track a New Habit</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Habit Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input-field"
                >
                  {HABIT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any details about this habit..."
                  className="input-field min-h-[100px] resize-none"
                />
              </div>

              <div className="flex space-x-3">
                <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Habit'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNotes('')
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
          <h3 className="text-xl font-bold text-gray-800">Recent Habits</h3>
          {habits.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No habits tracked yet. Start building your financial discipline today!
              </p>
              <button onClick={() => setShowForm(true)} className="btn-primary">
                Track Your First Habit
              </button>
            </div>
          ) : (
            habits.map((habit) => (
              <div key={habit.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{habit.habit_type}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(habit.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(habit.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                {habit.content && (
                  <p className="text-gray-700 ml-12 mt-2">{habit.content}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

