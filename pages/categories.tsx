import {
    Modal, Button, Container, Typography, Box, FormControl, InputLabel, Input, FormGroup
} from "@mui/material";
import { CategoryList, Layout } from "../components";
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Category } from "../models/Category";
import axios from 'axios';

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
export default function Categories() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [categories, setCategories] = React.useState<Array<Category>>([]);

    React.useEffect(() => {
        const headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('TOKEN')
            }
        }

        axios
            .get('https://localhost:7274/Categories', headers)
            .then(response => {
                setCategories(response.data);
            });

        return () => {
            setCategories([])
        }
    }, []);

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