import React from 'react';
import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Box,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface IHeaderContainerProps {
  searchKey: string | null;
  setSearchKey: (keyword: string) => void;
  locations: Set<string>;
  location: string | null;
  setLocation: (location: string | null) => void;
  departments: Set<string>;
  department: string | null;
  setDepartment: (department: string | null) => void;
  resetSearch: () => void;
}

const HeaderContainer = ({
  searchKey,
  setSearchKey,
  locations,
  location,
  setLocation,
  departments,
  department,
  setDepartment,
  resetSearch,
}: IHeaderContainerProps) => {
  return (
    <>
      <Container sx={{ padding: { xs: '20px', md: '40px' } }}>
        <Grid container spacing={5} columns={{ md: 2, xs: 1 }}>
          <Grid container item spacing={5}>
            <Grid item>
              <Typography variant={'h3'}>{'All Jobs'}</Typography>
            </Grid>
            <Grid item>
              <TextField
                variant={'outlined'}
                sx={{ width: '30ch', margin: '8px' }}
                label='search with job title...'
                value={searchKey ? searchKey : ''}
                disabled={!!(location || department)}
                onChange={(e) => setSearchKey(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid container item>
              <Grid item>
                <Box
                  component={'form'}
                  sx={{ '& .MuiTextField-root': { margin: 1, width: '30ch' } }}
                >
                  <TextField
                    select
                    variant={'outlined'}
                    label={'Location'}
                    value={location ? location : ''}
                  >
                    {[...locations].sort().map((loc) => (
                      // display in alphabetical order
                      <MenuItem
                        key={loc}
                        value={loc}
                        onClick={() => setLocation(loc)}
                        disabled={!!location}
                      >
                        {loc}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  component={'form'}
                  sx={{ '& .MuiTextField-root': { margin: 1, width: '30ch' } }}
                >
                  <TextField
                    select
                    variant={'outlined'}
                    label={'Department'}
                    value={department ? department : ''}
                    sx={{ width: '30ch' }}
                  >
                    {[...departments].sort().map((dep) => (
                      // display in alphabetical order
                      <MenuItem
                        key={dep}
                        value={dep}
                        onClick={() => setDepartment(dep)}
                        disabled={!!department}
                      >
                        {dep}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant={'outlined'}
                  sx={{
                    margin: '8px',
                    height: '56px',
                  }}
                  size={'large'}
                  onClick={resetSearch}
                >
                  Reset Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HeaderContainer;
