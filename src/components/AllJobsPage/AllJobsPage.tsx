import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

import HeaderContainer from '../HeaderContainer/HeaderContainer';
import JobsContainer from '../JobsContainer/JobsContainer';

interface IMetadata {
  id: number;
  name: string;
  value: string;
  value_type: string;
}

interface IDepartment {
  name: string;
}

export interface IJob {
  id: number;
  title: string;
  location: {
    name: string;
  };
  metadata: IMetadata[];
  departments: IDepartment[];
}

interface IJobsResponse {
  jobs: IJob[];
}

const AllJobsPage = () => {
  const [allJobs, setAllJobs] = useState<IJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<IJob[]>([]);
  const [searchKey, setSearchKey] = useState<string | null>(null);
  const [locations, setLocations] = useState<Set<string>>(new Set<string>());
  const [departments, setDepartments] = useState<Set<string>>(
    new Set<string>()
  );
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchKey) {
      // break down keywords and remove any whitespaces
      const keywords = searchKey
        ?.toLowerCase()
        .split(/(\s+)/)
        .filter((s) => s.trim().length > 0);
      // broad search for any job title that includes any of the keywords
      const filtered = allJobs.filter((j) => {
        const title = j.title.toLowerCase();
        return keywords?.every((key) => title.includes(key));
      });
      setFilteredJobs(filtered);
    }
  }, [searchKey, allJobs]);

  useEffect(() => {
    let filtered = filteredJobs;
    if (selectedLocation && selectedDepartment) {
      filtered = filteredJobs.filter(
        (j) =>
          j.location.name === selectedLocation &&
          j.departments[0].name === selectedDepartment
      );
    } else if (selectedLocation) {
      filtered = filteredJobs.filter(
        (j) => j.location.name === selectedLocation
      );
    } else if (selectedDepartment) {
      filtered = filteredJobs.filter(
        (j) => j.departments[0].name === selectedDepartment // departments field seem to only have one entry
      );
    }
    setFilteredJobs(filtered);
  }, [selectedLocation, selectedDepartment, filteredJobs]);

  useEffect(() => {
    // set `content=true` to retrieve department info as well
    const allJobsUrl =
      'https://boards-api.greenhouse.io/v1/boards/unity3d/jobs?content=true';

    const populateLocations = (res: IJobsResponse) => {
      const locationSet = res.jobs.reduce<Set<string>>(
        (acc: Set<string>, job: IJob) => {
          acc.add(job.location.name);
          return acc;
        },
        new Set()
      );
      setLocations(locationSet);
    };

    const populateDepartments = (res: IJobsResponse) => {
      const departmentSet = res.jobs.reduce<Set<string>>(
        (acc: Set<string>, job: IJob) => {
          acc.add(job.departments[0].name);
          return acc;
        },
        new Set()
      );
      setDepartments(departmentSet);
    };

    const populateJobs = (res: IJobsResponse) => {
      setAllJobs(res.jobs);
      setFilteredJobs(res.jobs);
    };

    const getJobsData = async () => {
      setLoading(true);
      const jobsRes = await axios.get<IJobsResponse>(allJobsUrl);
      populateLocations(jobsRes.data);
      populateDepartments(jobsRes.data);
      populateJobs(jobsRes.data);
      setLoading(false);
    };

    getJobsData();
  }, []);

  const resetSearch = () => {
    setSearchKey(null);
    setSelectedLocation(null);
    setSelectedDepartment(null);
    setFilteredJobs(allJobs);
  };

  return (
    <div style={{ backgroundColor: blueGrey[50], minHeight: '100vh' }}>
      <Container>
        <HeaderContainer
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          locations={locations}
          location={selectedLocation}
          setLocation={setSelectedLocation}
          departments={departments}
          department={selectedDepartment}
          setDepartment={setSelectedDepartment}
          resetSearch={resetSearch}
        />
        <JobsContainer jobs={filteredJobs} loading={loading} />
      </Container>
    </div>
  );
};

export default AllJobsPage;
