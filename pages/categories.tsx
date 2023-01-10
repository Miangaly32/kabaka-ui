import {
    Modal, Button, Container, Typography, Box, FormControl, InputLabel, Input, FormGroup
} from "@mui/material";
import { CategoryList, Layout } from "../components";
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Category } from "../models/Category";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const categories: Category[] = [{ 'name': 'Legume' }, { 'name': 'Viande' }];

export default function Categories() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Layout>
            <Container sx={{ my: 2 }}>
                <Typography variant="h5">Gestion des categories</Typography>
                <Button onClick={handleOpen} startIcon={<AddIcon />}> Ajouter </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Ajouter une categorie
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
                <CategoryList categories={categories} />
            </Container>
        </Layout>
    )
}