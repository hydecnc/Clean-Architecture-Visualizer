import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const LearningPopupContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
}));

export const LearningPopup = () => {
    return <LearningPopupContainer />;
};

export default LearningPopup;