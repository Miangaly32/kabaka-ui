import * as React from 'react';
import axios from 'axios';
import { Ingredient } from "../models/Ingredient";
import { Unit } from "../models/Unit";
import { Layout } from "../components";
import { Container } from "@mui/material";
import MealCreate from '../components/meal/MealCreate';

export default function Meal() {
    const [ingredients, setIngredients] = React.useState<Array<Ingredient>>([]);
    const [units, setUnits] = React.useState<Array<Unit>>([]);

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

        axios
            .get('https://localhost:7274/Units', headers)
            .then(response => {
                setUnits(response.data);
            });

        return () => {
            setIngredients([])
            setUnits([])
        }
    }, []);

    return (
        <Layout>
            <Container sx={{ my: 2 }}>
                <MealCreate ingredients={ingredients} units={units} />
            </Container>
        </Layout>
    )
}