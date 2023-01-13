import {
    Button, Box, FormControl, InputLabel, Input, FormGroup, TextareaAutosize
} from "@mui/material";
import { Ingredient } from "../../models/Ingredient";
import * as React from 'react';

export default function MealCreate({ ingredients }: { ingredients: Ingredient[] }) {
    const [nameValue, setNameValue] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    }

    const validate = () => {

    }

    return (
        <Box>
            <FormGroup sx={{ mt: 1 }}>
                <FormControl>
                    <InputLabel htmlFor="name" >Nom</InputLabel>
                    <Input id="name" value={nameValue} onChange={handleChange} aria-describedby="my-helper-text" />
                </FormControl>
            </FormGroup>

            <Box sx={{ p: 2 }}>
                <InputLabel htmlFor="description" >Description</InputLabel>
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Empty"
                    style={{ width: 200 }}
                    minRows={3}
                />
            </Box>
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