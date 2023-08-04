import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { IJob } from '../AllJobsPage/AllJobsPage';

interface IJobsContainerProps {
  jobs: IJob[];
  loading: boolean;
}

const JobsContainer = ({ jobs, loading }: IJobsContainerProps) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ padding: { xs: '20px', md: '40px' } }}>
      {jobs.length === 0 && !loading ? (
        <Container style={{ backgroundColor: blueGrey[50] }}>
          <Typography>{'No matching result.'}</Typography>
        </Container>
      ) : (
        <List sx={{ width: '100%', backgroundColor: 'background.paper' }}>
          {jobs.map((job) => (
            <ListItemButton
              key={job.id}
              divider
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <ListItemText
                primary={job.title}
                secondary={job.location.name}
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Container>
  );
};

export default JobsContainer;
