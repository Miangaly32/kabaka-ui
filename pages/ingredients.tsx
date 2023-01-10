import { IngredientList, Layout } from "../components";
import {
    Modal, Button, Container, Typography, Box, FormControl, InputLabel, Input, FormGroup
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
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
const ingredients: Ingredient[] = [
    { 'name': 'Haricot vert', 'category': { 'name': 'Legume' } },
    { 'name': 'Porc', 'category': { 'name': 'Viande' } }
];

export default function Ingredients() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        <FormGroup>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Nom</InputLabel>
                                <Input id="my-input" aria-describedby="my-helper-text" />
                            </FormControl>
                        </FormGroup>
                        <Box
                            m={1}
                            display="flex"
                            justifyContent="right"
                        >
                            <Button>Valider</Button>
                        </Box>
                    </Box>
                </Modal>
                <IngredientList ingredients={ingredients} />
            </Container>
        </Layout>
    )
}