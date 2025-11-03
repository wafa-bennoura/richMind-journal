import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useLanguage } from '../contexts/LanguageContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Dashboard() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    journalEntries: 0,
    habitsTracked: 0,
    goalsSet: 0,
  })
  const [recentEntries, setRecentEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [tasksRes, goalsRes] = await Promise.all([
        axios.get(`${API_URL}/tasks`),
        axios.get(`${API_URL}/tasks/vision-board`),
      ])

      const tasks = tasksRes.data
      const journalEntries = tasks.filter((t) => t.type === 'journal').length
      const habits = tasks.filter((t) => t.type === 'habit').length

      setStats({
        journalEntries,
        habitsTracked: habits,
        goalsSet: goalsRes.data.length,
      })

      setRecentEntries(
        tasks
          .filter((t) => t.type === 'journal')
          .slice(0, 3)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      )
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white">
          <h2 className="text-3xl font-bold">
            "Don't work for money, make money work for you"
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('journalEntries')}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {loading ? '...' : stats.journalEntries}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📔</span>
              </div>
            </div>
            <Link
              to="/journal"
              className="mt-4 inline-block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
            >
              {t('viewJournal')}
            </Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('habitsTracked')}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {loading ? '...' : stats.habitsTracked}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <Link
              to="/habits"
              className="mt-4 inline-block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
            >
              {t('trackHabits')}
            </Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('goalsSet')}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {loading ? '...' : stats.goalsSet}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <Link
              to="/vision-board"
              className="mt-4 inline-block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
            >
              {t('visionBoardLink')}
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('dailyReflection')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('writeAboutFinancial')}
            </p>
            <Link to="/journal" className="btn-primary inline-block">
              {t('writeJournalEntry')}
            </Link>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('trackYourHabits')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('recordFinancial')}
            </p>
            <Link to="/habits" className="btn-primary inline-block">
              {t('trackAHabit')}
            </Link>
          </div>
        </div>

        {/* Recent Entries */}
        {recentEntries.length > 0 && (
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('recentJournalEntries')}</h3>
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <p className="text-gray-800 dark:text-gray-100 mb-2">{entry.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inspiration Quote */}
        <div className="card bg-gray-800 dark:bg-gray-700 text-white">
          <p className="text-lg italic mb-2">
            "The single most powerful asset we all have is our mind. If it is trained well, it can
            create enormous wealth."
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-300">— Robert Kiyosaki, Rich Dad Poor Dad</p>
        </div>
      </div>
    </Layout>
  )
}


