import { MealList, Layout } from "../components";
import {
    Button, Container, Typography, Box, FormControl, InputLabel, Input, FormGroup
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';

const meals: Meal[] = [
    {
        'name': 'Porc et haricot vert',
        'description': 'Etape 1: decouper les haricot verts',
    },
    {
        'name': 'Porc et haricot vert',
        'description': 'Etape 1: decouper les haricot verts',
    }
];

export default function Meals() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Layout>
            <Container sx={{ my: 2 }}>
                <Typography variant="h5">Gestion des plats</Typography>
                <Button onClick={handleOpen} startIcon={<AddIcon />}> Ajouter </Button>

                <MealList meals={meals} />
            </Container>
        </Layout>
    )
}