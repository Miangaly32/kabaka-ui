import {
    Button, Box, FormControl, InputLabel, Input, FormGroup, TableHead, Table, TableRow, Tooltip, IconButton,
    TextareaAutosize, Select, MenuItem, SelectChangeEvent, TableContainer, Paper, TableCell, TableBody
} from "@mui/material";
import { Ingredient } from "../../models/Ingredient";
import { Unit } from "../../models/Unit";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as React from 'react';
import Router from 'next/router';
import axios from 'axios';

interface Props {
    ingredients: Ingredient[],
    units: Unit[]
}

export default function MealCreate(props: Props) {
    const { ingredients, units } = props;

    const [nameValue, setNameValue] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [quantity, setQuantity] = React.useState<number>(0);
    const [selectedIngredient, setSelectedIngredient] = React.useState<string>('');
    const [selectedUnit, setSelectedUnit] = React.useState<string>('');
    const [ingredientsList, setIngredientsList] = React.useState<Array<Ingredient>>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    }

    const validate = () => {
        const ingredientData = ingredientsList.map((ingredient) => {
            return {
                ingredientId: ingredient.id,
                quantity: ingredient.quantity,
                unitId: ingredient.unit?.id
            }
        })
        const newMeal = {
            "name": nameValue,
            "description": description,
            "ingredients": ingredientData
        };

        const headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
            }
        }

        axios
            .post('https://localhost:7274/Meals', newMeal, headers)
            .then(response => {
                if (response.status === 201) {
                    Router.push('/meals')
                }
            });

        console.log(nameValue, description, ingredientsList)
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setSelectedIngredient(event.target.value)
    }

    const handleChangeSelectUnit = (event: SelectChangeEvent) => {
        setSelectedUnit(event.target.value)
    }

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value)
    }

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const addIngredient = () => {
        const ingredient: Ingredient = JSON.parse(selectedIngredient);
        const unit: Unit = JSON.parse(selectedUnit);
        setIngredientsList(
            [
                ...ingredientsList,
                {
                    id: ingredient.id,
                    name: ingredient.name,
                    quantity: quantity,
                    unit: unit
                }
            ]
        )
        setSelectedIngredient('')
        setQuantity(0)
        setSelectedUnit('')
    }

    const removeIngredient = (index: number) => {
        setIngredientsList(ingredientsList.filter((ingredient, i) => i !== index))
    }

    return (
        <Box>
            <FormGroup sx={{ mt: 1 }}>
                <FormControl>
                    <InputLabel htmlFor="name" >Nom</InputLabel>
                    <Input
                        id="name"
                        value={nameValue}
                        onChange={handleChange}
                        aria-describedby="my-helper-text"
                    />
                </FormControl>
            </FormGroup>

            <Box sx={{ p: 2 }}>
                <InputLabel htmlFor="description" >Description</InputLabel>
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Empty"
                    style={{ width: 200 }}
                    minRows={3}
                    onChange={handleChangeDescription}
                />
            </Box>

            <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="demo-simple-select-label">Ingredients</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={selectedIngredient}
                    onChange={handleChangeSelect}
                    autoWidth
                    label="Ingredient"
                >
                    {
                        ingredients.map((ingredient, index: number) => {
                            return (
                                <MenuItem key={index} value={JSON.stringify(ingredient)}>
                                    {ingredient.name}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>

            <FormGroup sx={{ mt: 1 }}>
                <FormControl>
                    <InputLabel htmlFor="quantity" >Quantite</InputLabel>
                    <Input
                        id="quantity"
                        value={quantity}
                        onChange={handleChangeQuantity}
                        aria-describedby="my-helper-text"
                    />
                </FormControl>
            </FormGroup>

            <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="demo-simple-select-label">Unite</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={selectedUnit}
                    onChange={handleChangeSelectUnit}
                    autoWidth
                    label="Unite"
                >
                    {
                        units.map((unit, index: number) => {
                            return (
                                <MenuItem key={index} value={JSON.stringify(unit)}>
                                    {unit.symbol}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>

            <Button onClick={addIngredient}>
                Ajouter un ingredient
            </Button>

            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Quantite</TableCell>
                            <TableCell>Unite</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            ingredientsList.map((ingredient, index: number) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {ingredient.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {ingredient.quantity}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {ingredient.unit?.symbol}
                                        </TableCell>
                                        <TableCell >
                                            <Tooltip title="Retirer">
                                                <IconButton onClick={() => removeIngredient(index)} >
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                m={1}
                display="flex"
                justifyContent="right"
            >
                <Button onClick={validate}>Valider</Button>
            </Box>
        </Box>
    );
}