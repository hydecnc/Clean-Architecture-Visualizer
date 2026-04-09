import { Link, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import { CADiagram, Legend, SideBar } from '../components/diagram';
import { useState } from 'react';
import { MainViewContainer, PageContainer, Workspace } from './UseCaseInteractionCode/layout';
import IssuesSideBarContent from '@/components/diagram/IssuesSideBarContent';

export default function UseCaseInteractionDiagram() {
    const { useCaseId, interactionId } = useParams();
    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <PageContainer>
            <Header />
            <Workspace>
                <MainViewContainer>
                    <CADiagram/>
                    <Legend />
                    <Link
                        to={useCaseId && interactionId
                            ? `/use-case/${useCaseId}/interaction/${interactionId}/code`
                            : '/use-case-interaction-code'}
                        className="btn btn-primary"
                    >
                        View Use Case Interaction Code
                    </Link>
                </MainViewContainer>

                <SideBar isOpen={isOpen} onOpenChange={setIsOpen}>
                    <IssuesSideBarContent/>
                </SideBar>
            </Workspace>
        </PageContainer>
    );
}

