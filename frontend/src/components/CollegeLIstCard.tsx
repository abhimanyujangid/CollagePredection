import { ICollege } from '@/ZODtypes/college';
import { Img } from './Img';
import { Link } from 'react-router-dom';


  
  interface CollegeLIstCardProps {
    college: ICollege;
  }

const CollegeLIstCard = ({ college }: CollegeLIstCardProps) => {
    return (
        <div className=" transition duration-150">
            <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-md flex items-center justify-center">
                            <Img src={college?.logo?.url} alt="profile" className="w-16 h-16 rounded-full" />
                        </div>
                        <div className="ml-4">
                        <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{college?.collegeName}</span>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                {college?.university}
                            </h4>
                            <div className="flex items-center mt-1">
                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{college?.address?.city}, {college?.address?.state}, {college?.address?.country}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                        <Link to={`/dashboard/profile/college-details/${college?._id}`} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                            View details
                        </Link>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{college?.email}</span>
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">+91 {college?.contactNumber}</span>
                        </div>
                        
                    </div>
                    <div className="col-span-1">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">NIRF Ranking: {college?.rankingNIRF}</span>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200">
                                {college?.type.charAt(0).toUpperCase() + college?.type.slice(1)}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                                {college?.typeOfCollege.charAt(0).toUpperCase() + college?.typeOfCollege.slice(1)}
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollegeLIstCard