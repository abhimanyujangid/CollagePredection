import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { getCollegeByIdService } from '@/services/apis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Img } from '@/components/Img';
import { Button } from '@/components/ui/button';

const ViewCollege = () => {
  const collegeId = useParams<{ collegeId: string }>().collegeId || '';
  const { data, error, loading } = useFetch(getCollegeByIdService, collegeId);

  const mockData = {
    collegeName: 'Indian Institute of Technology, Delhi',
    university: 'University of Delhi',
    type: 'Government',
    typeOfCollege: 'Engineering',
    address: {
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
    },
    placementStatistics: {
      averagePackage: 12,
      highestPackage: 25,
      topRecruiters: ['Google', 'Microsoft', 'Amazon'],
    },
    rankingNIRF: 1,
    logo: {
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/IIT_Delhi_Logo.svg/1200px-IIT_Delhi_Logo.svg.png',
    },
    website: 'https://home.iitd.ac.in/',
    email: 'info@iitd.ac.in',
    contactNumber: '011 2659 7135',
    description: 'The Indian Institute of Technology Delhi (IIT Delhi) is a public technical and research university located in Hauz Khas, Delhi, India. It is one of the seven IITs created as centres of excellence for higher training, research and development in science, engineering and technology in India.',
  };

  if (loading) {
    return <Skeleton className="w-full h-96" />;
  }

  if (error || !data?.data) {
    return <p className="text-red-500">Failed to load college details.</p>;
  }

  console.log('College Data:', 
  );

  const {
    collegeName = 'N/A',
    university = 'N/A',
    type = 'N/A',
    typeOfCollege = 'N/A',
    address = {},
    placementStatistics = {},
    rankingNIRF = 'N/A',
    logo = {},
    website = 'N/A',
    email = 'N/A',
    contactNumber = 'N/A',
    description = 'N/A',
  } = data?.data;

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 shadow-lg rounded-xl">
      <CardHeader className="flex items-center space-x-4">
        <Img src={logo.url} alt="logo" className="w-12 h-12 rounded-full" />
        <div>
          <CardTitle className="text-2xl font-bold">{collegeName}</CardTitle>
          <p className="text-sm text-gray-500">{university}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Type:</strong> {type} ({typeOfCollege})</p>
            <p><strong>Address:</strong> {address.city || 'N/A'}, {address.state || 'N/A'}, {address.country || 'N/A'}</p>
            <p><strong>Ranking (NIRF):</strong> {rankingNIRF}</p>
          </div>
          <div>
            <p><strong>Website:</strong> {website !== 'N/A' ? <a href={website} className="text-blue-600 underline">{website}</a> : 'N/A'}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Contact:</strong> {contactNumber}</p>
          </div>
        </div>
        <p><strong>Description:</strong> {description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Placement Statistics</h3>
          <p><strong>Average Package:</strong> {placementStatistics.averagePackage || 'N/A'} LPA</p>
          <p><strong>Highest Package:</strong> {placementStatistics.highestPackage || 'N/A'} LPA</p>
          <p><strong>Top Recruiters:</strong> {placementStatistics.topRecruiters.length > 0 ? placementStatistics.topRecruiters.join(', ') : 'N/A'}</p>
        </div>
        </header>
        <section>
          <div>
            <Button>ADd Stream</Button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default ViewCollege;
