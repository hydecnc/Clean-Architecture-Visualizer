import { Link } from 'react-router-dom';
import { CADiagram } from '../components/diagram';
import Header from '../components/common/Header';
import { PageContainer, Workspace, SidebarContainer, Resizer, MainViewContainer } from '../components/diagram/CADiagramPageLayout';
import { LearningPopup } from '../components/diagram/index.ts';

export default function LearningMode() {
    return (
        <div className="learning-mode-page">
            <PageContainer>
                <Header />
            
                <body>
                  <Workspace>
                    <MainViewContainer>
                        <CADiagram />
                        <Link to="/">Back to Home</Link>
                    </MainViewContainer>

                    {/* <Resizer onMouseDown={startResizing} /> */}

                    <SidebarContainer sidebarWidth={0.25 * window.innerWidth}>
                      <LearningPopup />
                    </SidebarContainer>
                  </Workspace>
                
            
            </body>
            </PageContainer>
        </div>
    );
}