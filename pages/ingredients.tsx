import { IngredientList, Layout } from "../components";
import {
    Modal, Button, Container, Typography, Box, FormControl, InputLabel, Input, FormGroup,
    Select, MenuItem, SelectChangeEvent
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import axios from 'axios';
import { Category } from "../models/Category";
import { Ingredient } from "../models/Ingredient";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function Ingredients() {
    const [open, setOpen] = React.useState(false);
    const [nameValue, setNameValue] = React.useState<string>('');
    const [category, setCategory] = React.useState<string>('');
    const [categoryId, setCategoryId] = React.useState<string>('');
    const [ingredients, setIngredients] = React.useState<Array<Ingredient>>([]);
    const [categories, setCategories] = React.useState<Array<Category>>([]);

    const headers = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
        }
    }

    React.useEffect(() => {
        axios
            .get('https://localhost:7274/Ingredients', headers)
            .then(response => {
                setIngredients(response.data);
            });

        axios
            .get('https://localhost:7274/Categories', headers)
            .then(response => {
                setCategories(response.data);
            });

        return () => {
            setIngredients([])
            setCategories([])
        }
    }, []);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validate = () => {
        const newIngredient = {
            "name": nameValue,
            "colorId": 2,
            "categoryId": categoryId
        };

        axios
            .post(
                'https://localhost:7274/Ingredients',
                newIngredient,
                headers,
            )
            .then(response => {
                if (response.status === 201) {
                    setNameValue('')
                    setCategory('')
                    setIngredients([...ingredients, response.data])
                    setOpen(false);
                }
            });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategoryId(event.target.value);
        setCategory(event.target.value as string);
    }

    return (
        <Layout>
            <Container sx={{ my: 2 }}>
                <Typography variant="h5">Gestion des ingredients</Typography>
                <Button onClick={handleOpen} startIcon={<AddIcon />}> Ajouter </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Ajouter un ingredient
                        </Typography>
                        <FormGroup sx={{ mt: 1 }}>
                            <FormControl>
                                <InputLabel htmlFor="name" >Nom</InputLabel>
                                <Input id="name" value={nameValue} onChange={handleChange} aria-describedby="my-helper-text" />
                            </FormControl>
                        </FormGroup>
                        <FormGroup sx={{ mt: 1 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Categorie"
                                    onChange={handleCategoryChange}
                                >
                                    {
                                        categories.map((cat: Category) => <MenuItem key={cat.id} value={cat.id} name={cat.name} >{cat.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </FormGroup>
                        <Box
                            m={1}
                            display="flex"
                            justifyContent="right"
                        >
                            <Button onClick={validate}>Valider</Button>
                        </Box>
                    </Box>
                </Modal>
                <IngredientList ingredients={ingredients} />
            </Container>
        </Layout>
    )
}