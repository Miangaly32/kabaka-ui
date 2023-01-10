import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Ingredient } from '../../models/Ingredient';

type Props = {
    ingredients: Ingredient[]
}

const IngredientList: React.FC<Props> = (props) => {
    const ingredientRows = props.ingredients.map((ingredient: Ingredient, index: number) => {
        return (
            <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {ingredient.name}
                </TableCell>
                <TableCell >
                    <EditIcon />
                    <DeleteOutlineIcon />
                </TableCell>
            </TableRow>
        );
    });
    return (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredientRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default IngredientList;