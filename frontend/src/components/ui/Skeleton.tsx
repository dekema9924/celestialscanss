import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

type AnimationsProps = {
    id?: string;
};

export default function Animations({ id }: AnimationsProps) {
    return (
        <Box
            key={id}
            sx={{
                width: '100%',
                maxWidth: 600,
                mx: 'auto',
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2, // space between skeletons
            }}
        >
            <Skeleton
                variant="rectangular"
                animation="wave"
                height={180}
                sx={{
                    borderRadius: 2,
                    bgcolor: '#1c2a3a', // base color of skeleton
                }}
            />
            <Skeleton
                animation="wave"
                height={30}
                sx={{
                    width: '60%',
                    borderRadius: 1,
                    bgcolor: '#1c2a3a',
                }}
            />
            <Skeleton
                height={30}
                sx={{
                    width: '40%',
                    borderRadius: 1,
                    bgcolor: '#1c2a3a',
                }}
            />
        </Box>
    );
}
