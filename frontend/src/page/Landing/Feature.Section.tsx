import FeatureCard from '@/components/FeatureCard'
import { featureCards } from '@/constant/data'

const FeatureSection = () => {
  return (
    <section className=' mx-auto px-4 lg:px-16 py-16 bg-muted w-full'>
        <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold  mb-4">Powerful Features</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our AI-powered platform helps you find the perfect college and academic stream with these amazing features.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-9 lg:gap-12'>
      {/* Feature Cards */}
      { featureCards.map((card, index) => (
        <FeatureCard key={index} logo={card.logo} title={card.title} description={card.description} features={card.features} />
      ))}
      
      </div>
    </section>
  )
}

export default  FeatureSection