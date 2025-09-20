import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

type AnimationsProps = {
    id?: string;
};

export default function Animations({ id }: AnimationsProps) {
    return (
        <Box key={id} sx={{ width: 220, p: 1 }}>
            <Skeleton variant="rectangular" width="100%" height={180} />
            <Skeleton animation="wave" height={30} />
            <Skeleton height={30} animation={false} />
        </Box>
    );
}