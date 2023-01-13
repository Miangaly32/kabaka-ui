import { MealList, Layout } from "../components";
import {
    Button, Container, Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";
import * as React from 'react';
import axios from 'axios';
import { Meal } from "../models/Meal";

export default function Meals() {
    const [meals, setMeals] = React.useState<Array<Meal>>([]);

    React.useEffect(() => {
        const headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
            }
        }

        axios
            .get('https://localhost:7274/Meals', headers)
            .then(response => {
                setMeals(response.data);
            });

        
    }, []);

    return (
        <Layout>
            <Container sx={{ my: 2 }}>
                <Typography variant="h5">Gestion des plats</Typography>
                <Link href="/meal">
                    <Button startIcon={<AddIcon />}> Ajouter </Button>
                </Link>
                <MealList meals={meals} />
            </Container>
        </Layout>
    )
}