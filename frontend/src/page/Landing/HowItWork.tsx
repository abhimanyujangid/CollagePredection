import CompleteQuestion from '@/components/HowItwork/CompleteQuestion'
import CreateProfile from '@/components/HowItwork/CreateProfile'
import HowItWorkCard from '@/components/HowItwork/HowItWorkCard'
import YourMatch from '@/components/HowItwork/YourMatch'
import { howItWorkData } from '@/constant/data'

const HowItWork = () => {
  return (
   <div className=' mx-auto px-4 lg:px-16 py-16  w-full'>
    <header className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold  mb-4">How It Works</h2>
        <p className="text-lg  max-w-4xl mx-auto text-gray-600 dark:text-gray-300">
          Our intelligent platform makes finding your ideal college simple and intuitive in just a few steps.
        </p>
    </header>
    <section className='w-full flex flex-col items-center justify-center gap-20'>
        {
            howItWorkData.map(({ id, title, description, features, component }) => (
                <div key={id} className={`flex justify-center items-center gap-12 ${id % 2 === 0 ? 'flex-reverse' : ''}`}>
                    {id % 2 === 0 ? component : <HowItWorkCard id={id} title={title} description={description} features={features} />}
                    {id % 2 === 0 ? <HowItWorkCard id={id} title={title} description={description} features={features} /> : component}
                </div>
            ))
        }
    </section>
   </div>
  )
}

export default HowItWork