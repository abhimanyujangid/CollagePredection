import CompleteQuestion from '@/components/HowItwork/CompleteQuestion'
import CreateProfile from '@/components/HowItwork/CreateProfile'
import HowItWorkCard from '@/components/HowItwork/HowItWorkCard'

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
        <div className='flex justify-center items-center  gap-12'>
            <HowItWorkCard id={1} title='Create Profile' description='Sign up and tell us about your academic interests, location preferences, and budget. This helps our AI understand your needs better.' features={['Choose between student or admin account', 'Fill in your academic details', 'Set your preferences and requirements']} />
            <CreateProfile />
        </div>
        <div className='flex justify-center items-center gap-12'>
            <CompleteQuestion />
            <HowItWorkCard id={2} title='Complete the Questionnaire' description='Answer a series of interactive questions that help our AI understand your specific requirements and preferences for college selection.' features={['Select your preferred field of study', 'Specify your budget and location preferences', 'Rank factors that matter most to you']} />
        </div>
    </section>
   </div>
  )
}

export default HowItWork