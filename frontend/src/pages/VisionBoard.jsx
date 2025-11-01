import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function VisionBoard() {
  const [goals, setGoals] = useState([])
  const [goalText, setGoalText] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks/vision-board`)
      setGoals(response.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)))
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!goalText.trim()) return

    setLoading(true)
    try {
      if (editingId) {
        await axios.put(`${API_URL}/tasks/vision-board/${editingId}`, {
          goal_text: goalText.trim(),
          target_date: targetDate || null,
        })
        setEditingId(null)
      } else {
        await axios.post(`${API_URL}/tasks/vision-board`, {
          goal_text: goalText.trim(),
          target_date: targetDate || null,
        })
      }
      setGoalText('')
      setTargetDate('')
      setShowForm(false)
      fetchGoals()
    } catch (error) {
      console.error('Error saving goal:', error)
      alert('Failed to save goal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (goal) => {
    setGoalText(goal.goal_text)
    setTargetDate(goal.target_date || '')
    setEditingId(goal.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this goal?')) return

    try {
      await axios.delete(`${API_URL}/tasks/vision-board/${id}`)
      fetchGoals()
    } catch (error) {
      console.error('Error deleting goal:', error)
      alert('Failed to delete goal. Please try again.')
    }
  }

  const cancelEdit = () => {
    setGoalText('')
    setTargetDate('')
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Vision Board</h2>
            <p className="text-gray-600 mt-1">
              Set your long-term financial goals. Visualize your path to financial freedom.
            </p>
          </div>
          <button
            onClick={() => {
              cancelEdit()
              setShowForm(!showForm)
            }}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add Goal'}
          </button>
        </div>

        {showForm && (
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? 'Edit Goal' : 'Add New Goal'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Goal
                </label>
                <textarea
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                  placeholder="E.g., Save $50,000 for investment portfolio by end of year"
                  className="input-field min-h-[100px] resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Date (optional)
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingId ? 'Update Goal' : 'Save Goal'}
                </button>
                <button type="button" onClick={cancelEdit} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.length === 0 ? (
            <div className="col-span-full card text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No goals set yet. Start visualizing your financial future!
              </p>
              <button onClick={() => setShowForm(true)} className="btn-primary">
                Add Your First Goal
              </button>
            </div>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-800 font-semibold mb-3">{goal.goal_text}</p>
                {goal.target_date && (
                  <p className="text-sm text-gray-600">
                    Target: {new Date(goal.target_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-3">
                  Created: {new Date(goal.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}


