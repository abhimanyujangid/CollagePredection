import { ICollege } from '@/ZODtypes/college';
import { Link } from 'react-router-dom';
import { capitalize } from '@/utils';



interface CollegeLIstCardProps {
    college: ICollege;
}

const CollegeLIstCard = ({ college }: CollegeLIstCardProps) => {
    return (
        <div className=" transition duration-150">
            <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-900 border-2 border-indigo-200 dark:border-indigo-700 flex items-center justify-center">
                            {college?.logo_tag ? (
                                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-300">{college?.logo_tag?.toUpperCase()}</p>
                            ) : (
                                <svg className="h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-4">
                            <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{capitalize(college?.university)}</span>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                {college?.university}
                            </h4>
                            <div className="flex items-center mt-1">
                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{capitalize(college?.address?.city)}, {capitalize(college?.address?.state)}, {college?.address?.country}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                        <Link to={`/dashboard/profile/college-details/${college?._id}`} className=" flex text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                            View details
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{college?.email}</span>
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                            {college?.contactNumber && <span className="text-sm font-medium text-gray-900 dark:text-white">+91 {college?.contactNumber}</span>}
                        </div>

                    </div>
                    <div className="flex items-center ">
                        <svg className="h-5 w-5 text-amber-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">NIRF Ranking</span>
                            <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{college?.rankingNIRF || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200">
                                {capitalize(college?.type)}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                                {capitalize(college?.typeOfCollege?.join(', '))}
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollegeLIstCard