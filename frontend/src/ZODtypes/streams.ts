export type Stream = {
  _id?: string;
    streamName: string;
    type: 'undergraduate' | 'postgraduate' | 'diploma';
    duration: number;
    fees: number;
    eligibilityCriteria: {
      minTenthPercentage: number;
      minTwelfthPercentage: number;
      requiredExams: string[];
      additionalCriteria?: any;
    };
  };
  