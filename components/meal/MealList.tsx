import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { Meal } from '../../models/Meal';

export default function MealList({ meals }: { meals: Meal[] }) {
    return (
        <Grid container spacing={1} >
            {
                meals.map((meal: Meal, index: number) => {
                    return (
                        <Grid item xs={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {meal.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {meal.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Detail</Button>
                                    <Button size="small">Modifier</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}