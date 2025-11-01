import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'

const motivationalQuotes = [
  {
    quote: "The single most powerful asset we all have is our mind. If it is trained well, it can create enormous wealth.",
    quoteFr: "L'actif le plus puissant que nous ayons tous est notre esprit. S'il est bien formé, il peut créer une richesse énorme.",
    quoteAr: "الأصل الأقوى الذي نملكه جميعاً هو عقلنا. إذا تم تدريبه جيداً، يمكنه خلق ثروة هائلة.",
    quoteEs: "El activo más poderoso que todos tenemos es nuestra mente. Si está bien entrenada, puede crear una riqueza enorme.",
    author: "Robert Kiyosaki",
    book: "Rich Dad Poor Dad",
  },
  {
    quote: "Rich people focus on their asset columns while everyone else focuses on their income statements.",
    quoteFr: "Les riches se concentrent sur leurs colonnes d'actifs tandis que tous les autres se concentrent sur leurs états des revenus.",
    quoteAr: "يركز الأثرياء على أعمدة أصولهم بينما يركز الجميع على قوائم دخلهم.",
    quoteEs: "Los ricos se enfocan en sus columnas de activos mientras que todos los demás se enfocan en sus estados de ingresos.",
    author: "Robert Kiyosaki",
    book: "Rich Dad Poor Dad",
  },
  {
    quote: "The difference between the rich and the poor is that the rich have money work for them, while the poor work for money.",
    quoteFr: "La différence entre les riches et les pauvres est que les riches font travailler l'argent pour eux, tandis que les pauvres travaillent pour l'argent.",
    quoteAr: "الفرق بين الأثرياء والفقراء هو أن الأثرياء يجعلون المال يعمل لصالحهم، بينما الفقراء يعملون من أجل المال.",
    quoteEs: "La diferencia entre ricos y pobres es que los ricos hacen que el dinero trabaje para ellos, mientras que los pobres trabajan por dinero.",
    author: "Robert Kiyosaki",
    book: "Rich Dad Poor Dad",
  },
  {
    quote: "Don't work for money; make money work for you.",
    quoteFr: "Ne travaillez pas pour l'argent; faites travailler l'argent pour vous.",
    quoteAr: "لا تعمل من أجل المال؛ اجعل المال يعمل لصالحك.",
    quoteEs: "No trabajes por dinero; haz que el dinero trabaje para ti.",
    author: "Robert Kiyosaki",
    book: "Rich Dad Poor Dad",
  },
  {
    quote: "The more you learn, the more you earn.",
    quoteFr: "Plus vous apprenez, plus vous gagnez.",
    quoteAr: "كلما تعلمت أكثر، كلما كسبت أكثر.",
    quoteEs: "Cuanto más aprendes, más ganas.",
    author: "Warren Buffett",
    book: "",
  },
  {
    quote: "Wealth is the ability to fully experience life.",
    quoteFr: "La richesse est la capacité de vivre pleinement la vie.",
    quoteAr: "الثروة هي القدرة على تجربة الحياة بالكامل.",
    quoteEs: "La riqueza es la capacidad de experimentar la vida plenamente.",
    author: "Henry David Thoreau",
    book: "",
  },
  {
    quote: "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    quoteFr: "Ce n'est pas combien d'argent vous gagnez, mais combien vous gardez, à quel point il travaille pour vous, et combien de générations vous le gardez.",
    quoteAr: "ليس الأمر يتعلق بكمية المال التي تجنيها، بل بكمية المال التي تحتفظ بها، ومدى صعوبة عمله لصالحك، وكم جيل تحتفظ به.",
    quoteEs: "No se trata de cuánto dinero ganas, sino de cuánto dinero guardas, qué tan duro trabaja para ti y cuántas generaciones lo guardas.",
    author: "Robert Kiyosaki",
    book: "Rich Dad Poor Dad",
  },
  {
    quote: "The way to become rich is to put yourself in a position where you take advantage of compounding. It's exponential growth.",
    quoteFr: "Le moyen de devenir riche est de vous mettre dans une position où vous profitez de la composition. C'est une croissance exponentielle.",
    quoteAr: "طريقة أن تصبح ثرياً هي وضع نفسك في موضع تستفيد فيه من الفائدة المركبة. إنه نمو أسي.",
    quoteEs: "La forma de volverse rico es ponerse en una posición donde aprovechas el interés compuesto. Es crecimiento exponencial.",
    author: "Charlie Munger",
    book: "",
  },
  {
    quote: "An investment in knowledge pays the best interest.",
    quoteFr: "Un investissement dans la connaissance rapporte le meilleur intérêt.",
    quoteAr: "الاستثمار في المعرفة يدفع أفضل فائدة.",
    quoteEs: "Una inversión en conocimiento paga el mejor interés.",
    author: "Benjamin Franklin",
    book: "",
  },
  {
    quote: "If you don't find a way to make money while you sleep, you will work until you die.",
    quoteFr: "Si vous ne trouvez pas un moyen de gagner de l'argent pendant que vous dormez, vous travaillerez jusqu'à votre mort.",
    quoteAr: "إذا لم تجد طريقة لكسب المال أثناء النوم، فسوف تعمل حتى تموت.",
    quoteEs: "Si no encuentras una manera de ganar dinero mientras duermes, trabajarás hasta que mueras.",
    author: "Warren Buffett",
    book: "",
  },
  {
    quote: "The biggest risk is not taking any risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
    quoteFr: "Le plus grand risque est de ne prendre aucun risque. Dans un monde qui change vraiment rapidement, la seule stratégie garantie d'échouer est de ne pas prendre de risques.",
    quoteAr: "أكبر خطر هو عدم تحمل أي مخاطرة. في عالم يتغير بسرعة كبيرة، الاستراتيجية الوحيدة المضمونة للفشل هي عدم تحمل المخاطر.",
    quoteEs: "El mayor riesgo es no correr ningún riesgo. En un mundo que cambia muy rápido, la única estrategia garantizada para fallar es no tomar riesgos.",
    author: "Mark Zuckerberg",
    book: "",
  },
  {
    quote: "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    quoteFr: "L'argent n'est qu'un outil. Il vous mènera où vous le souhaitez, mais il ne vous remplacera pas comme conducteur.",
    quoteAr: "المال هو مجرد أداة. سينقلك إلى حيث تريد، لكنه لن يحل محل السائق.",
    quoteEs: "El dinero es solo una herramienta. Te llevará a donde quieras, pero no te reemplazará como conductor.",
    author: "Ayn Rand",
    book: "",
  },
]

export default function Landing() {
  const { t, language } = useLanguage()

  const getQuote = (quoteObj) => {
    if (language === 'fr') return quoteObj.quoteFr || quoteObj.quote
    if (language === 'ar') return quoteObj.quoteAr || quoteObj.quote
    if (language === 'es') return quoteObj.quoteEs || quoteObj.quote
    return quoteObj.quote
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Header with Sign In and Register */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">RM</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">RichMind Journal</h1>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {t('signIn')}
              </Link>
              <Link
                to="/register"
                className="btn-primary"
              >
                {t('register')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            {t('transformFinancial')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('buildMindset')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              {t('startJourney')}
            </Link>
            <Link
              to="/login"
              className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 border-2 border-primary-600 dark:border-primary-500 text-lg"
            >
              {t('signIn')}
            </Link>
          </div>
        </div>

        {/* Motivational Quotes Wall */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {t('howToMakeMoney')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {motivationalQuotes.map((quoteObj, index) => (
              <div
                key={index}
                className="card bg-gradient-to-br from-white to-primary-50 dark:from-gray-800 dark:to-gray-700 border-2 border-primary-100 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`flex items-start mb-4 ${language === 'ar' ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl">💰</span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-gray-800 dark:text-gray-100 text-lg italic leading-relaxed mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
                      "{getQuote(quoteObj)}"
                    </p>
                    <div className={`border-t border-primary-200 dark:border-gray-600 pt-3 ${language === 'ar' ? 'text-right' : ''}`}>
                      <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">{quoteObj.author}</p>
                      {quoteObj.book && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{quoteObj.book}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="card dark:bg-gray-800 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {t('digitalCoach')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📔</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('dailyJournal')}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {t('journalDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('habitsTracker')}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {t('habitsDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('visionBoard')}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {t('visionDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-2xl shadow-xl p-12 text-white mb-16">
          <h3 className="text-4xl font-bold mb-4">{t('readyToChange')}</h3>
          <p className="text-xl text-primary-100 dark:text-primary-200 mb-8 max-w-2xl mx-auto">
            {t('joinThousands')}
          </p>
          <Link to="/register" className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold py-4 px-10 rounded-lg transition-colors duration-200 text-lg inline-block">
            {t('getStartedFree')}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 dark:text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            {t('richMindTagline')}
          </p>
        </div>
      </footer>
    </div>
  )
}
