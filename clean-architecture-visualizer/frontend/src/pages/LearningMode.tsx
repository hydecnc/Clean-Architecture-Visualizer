import { Link } from 'react-router-dom';
import { CADiagram } from '../components/diagram';
import Header from '../components/common/Header';

export default function LearningMode() {
    return (
        <div>
              <Header />
              <CADiagram />
            
            <Link to="/">Back to Home</Link>
        </div>
    );
}