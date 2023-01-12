import { Layout } from "../components/";
import { Container, Grid, Typography, Box, Button } from '@mui/material';

function HomePage() {
  return (
    <Layout>
      <Container>
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={4}>
            <Typography variant="h5">KABAKA qu’est ce que c’est ?</Typography>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Box
              m={1}
              display="flex"
              justifyContent="right"
            >
              <Button>S'inscrire</Button>
            </Box>
          </Grid>
          <Grid item xs={8}>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default HomePage