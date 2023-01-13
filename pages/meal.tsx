import * as React from 'react';
import axios from 'axios';
import { Ingredient } from "../models/Ingredient";
import { Layout } from "../components";
import { Container } from "@mui/material";
import MealCreate from '../components/meal/MealCreate';

export default function Meal() {
    const [ingredients, setIngredients] = React.useState<Array<Ingredient>>([]);

    React.useEffect(() => {
        const headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
            }
        }

        axios
            .get('https://localhost:7274/Ingredients', headers)
            .then(response => {
                setIngredients(response.data);
            });

        return () => {
            setIngredients([])
        }
    }, []);

    return (
        <Layout>
            <Container sx={{ my: 2 }}>
                <MealCreate ingredients={ingredients} />
            </Container>
        </Layout>
    )
}