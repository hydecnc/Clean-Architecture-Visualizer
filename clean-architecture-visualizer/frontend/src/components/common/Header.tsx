import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown.tsx';
import { Box, Paper, Typography } from '@mui/material';
import { HomeIcon } from '../../assets/icons';

export default function Header() {
    const navigate = useNavigate();

    const navigationOptions = ['Learning Mode', 'Checker Mode', 'Project Starter'];

    const handleNavigation = (option: string) => {
        switch (option) {
            case 'Learning Mode':
                navigate('/learning');
                break;
            case 'Checker Mode':
                navigate('/checker');
                break;
            case 'Project Starter':
                navigate('/project-starter');
                break;
        }
    };

    return (
        <header>
            <Paper elevation={3} sx ={{ marginBottom: 2, backgroundColor: 'transparent' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2}}>
                    <Box component={Link} to="/" sx={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                        <Box sx={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', color: 'text.primary' }}>
                            <HomeIcon style={{ width: '100%', height: '100%', verticalAlign: 'middle', color: 'currentColor' }} />
                        </Box>
                        <Typography variant="h6" component="span" sx={{ marginLeft: 1, color: 'text.primary' }}>
                            CAVE
                        </Typography>
                    </Box>
                    <Dropdown options={navigationOptions} onSelect={handleNavigation} />
                </Box>
                
            </Paper>
        </header>
    );
}