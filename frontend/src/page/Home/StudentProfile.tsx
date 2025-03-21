import AcademicInformationForm from '@/components/AcademicInformationForm'
import PersonalInformationForm from '@/components/PersonalInformationForm'

const StudentProfile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button className="border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Student Profile
          </button>
        </nav>
      </div>
      <div className='grid grid-cols-1 gap-6 mt-6'>
        <PersonalInformationForm />
        <AcademicInformationForm />
      </div>
      </div>
  )
}

export default StudentProfile