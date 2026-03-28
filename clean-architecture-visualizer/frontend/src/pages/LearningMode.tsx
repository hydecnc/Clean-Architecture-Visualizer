import { useState } from 'react';
import { CADiagram, SideBar, Legend, type NodeClickInfo } from '../components/diagram';
import Header from '../components/common/Header';
import { PageContainer, Workspace, MainViewContainer } from '../components/diagram/CADiagramPageLayout';
import { LearningSideBarContent } from '../components/diagram/index.ts';

export default function LearningMode() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentNodeInfo, setCurrentNodeInfo] = useState<NodeClickInfo | null>(null);

    const updateLearningModePopup = (info: NodeClickInfo) => {
        // Update the current node info to display in the sidebar
        setCurrentNodeInfo(info);
        // Open the sidebar
        setIsOpen(true);
    };

    return (
        <PageContainer>
            <Header />
            <Workspace>
                <MainViewContainer>
                    <CADiagram onNodeClick={updateLearningModePopup} />
                    <Legend />
                </MainViewContainer>

                <SideBar isOpen={isOpen} onOpenChange={setIsOpen}>
                    <LearningSideBarContent nodeInfo={currentNodeInfo} />
                </SideBar>
            </Workspace>
        </PageContainer>
    );
}