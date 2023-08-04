import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

import { Container, Typography } from '@mui/material';
import { IJob } from '../AllJobsPage/AllJobsPage';
import { grey } from '@mui/material/colors';

interface IJobDetailResponse extends IJob {
  content: string;
}

const JobDetailsPage = () => {
  const { id } = useParams(); // id param from url => job id
  const [jobDetails, setJobDetails] = useState<IJobDetailResponse | null>(null);

  useEffect(() => {
    const jobUrl = `https://boards-api.greenhouse.io/v1/boards/unity3d/jobs/${id}`;

    const populateJobDetails = (res: IJobDetailResponse) => {
      // to decode HTML from the original returned content
      const decodedContent = document.createElement('textarea');
      decodedContent.innerHTML = res.content;
      const decodedDetail: IJobDetailResponse = {
        id: res.id,
        title: res.title,
        location: res.location,
        metadata: res.metadata,
        departments: res.departments,
        content: decodedContent.value,
      };
      setJobDetails(decodedDetail);
    };

    const getJobDetailsData = async () => {
      const jobDetailsRes = await axios.get<IJobDetailResponse>(jobUrl);
      populateJobDetails(jobDetailsRes.data);
    };
    getJobDetailsData();
  }, []);

  return (
    <div style={{ backgroundColor: grey[100] }}>
      <Container
        maxWidth='md'
        sx={{
          backgroundColor: 'background.paper',
          paddingTop: '50px',
          paddingBottom: '50px',
        }}
      >
        <Container
          disableGutters
          sx={{ paddingTop: '60px', paddingBottom: '40px' }}
        >
          <Typography variant={'h3'} sx={{ fontWeight: '500' }}>
            {jobDetails?.title}
          </Typography>
          <Typography variant={'h5'}>{jobDetails?.location.name}</Typography>
        </Container>
        <div
          className='content'
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(jobDetails?.content || ''),
          }}
        />
      </Container>
    </div>
  );
};

export default JobDetailsPage;
