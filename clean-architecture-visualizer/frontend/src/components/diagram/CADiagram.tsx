// This file contains all the logic for displaying the CA Diagram, including fetching the data and handling loading/error states. 
// The actual rendering of the diagram is delegated to CADiagramView, which is a pure presentational component that receives all 
// the data it needs as props.

import { Typography, Container, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CADiagramView } from './index';
import type { CANode, CAComponentType, CALayer } from '../../lib/types';
import { useInteraction } from '../../actions/useAnalysis';

const componentLayerMap: Record<CAComponentType, CALayer> = {
    Controller: 'InterfaceAdapters',
    Presenter: 'InterfaceAdapters',
    View: 'Frameworks',
    ViewModel: 'InterfaceAdapters',
    InputBoundary: 'ApplicationBusinessRules',
    OutputBoundary: 'ApplicationBusinessRules',
    InputData: 'ApplicationBusinessRules',
    OutputData: 'ApplicationBusinessRules',
    Interactor: 'ApplicationBusinessRules',
    Entity: 'EnterpriseBusinessRules',
    DataAccessInterface: 'ApplicationBusinessRules',
    DataAccess: 'Frameworks',
    Database: 'Frameworks',
};

const getNodeByType = (nodes: CANode[], type: CAComponentType): CANode => {
    const node = nodes.find((candidate) => candidate.type === type);
    return (
        node ?? {
            id: `missing-${type}`,
            name: `${type} (Missing)`,
            type,
            layer: componentLayerMap[type],
            status: 'MISSING',
        }
    );
};

export function CADiagram() {
    const { interactionId } = useParams<{ interactionId: string }>();
    const {
        data: interactionData,
        isLoading,
        isError,
        error,
    } = useInteraction(interactionId ?? '');

    if (!interactionId) {
        return (
            <Container maxWidth="lg">
                <Typography color="error">Missing interaction id in URL.</Typography>
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (isError || !interactionData) {
        return (
            <Container maxWidth="lg">
                <Typography color="error">
                    {error instanceof Error ? error.message : 'Failed to load interaction data.'}
                </Typography>
            </Container>
        );
    }

    const nodes = interactionData.nodes ?? [];
    const edges = interactionData.edges ?? [];

    const controller = getNodeByType(nodes, 'Controller');
    const presenter = getNodeByType(nodes, 'Presenter');
    const viewModel = getNodeByType(nodes, 'ViewModel');
    const inputData = getNodeByType(nodes, 'InputData');
    const inputBoundary = getNodeByType(nodes, 'InputBoundary');
    const interactor = getNodeByType(nodes, 'Interactor');
    const outputBoundary = getNodeByType(nodes, 'OutputBoundary');
    const outputData = getNodeByType(nodes, 'OutputData');
    const dataAccessInterface = getNodeByType(nodes, 'DataAccessInterface');
    const entities = getNodeByType(nodes, 'Entity');
    const view = getNodeByType(nodes, 'View');
    const dataAccess = getNodeByType(nodes, 'DataAccess');
    const database = getNodeByType(nodes, 'Database');

    return (
        <CADiagramView
            controller={controller}
            presenter={presenter}
            viewModel={viewModel}
            inputData={inputData}
            inputBoundary={inputBoundary}
            interactor={interactor}
            outputBoundary={outputBoundary}
            outputData={outputData}
            dataAccessInterface={dataAccessInterface}
            entities={entities}
            view={view}
            dataAccess={dataAccess}
            database={database}
            edges={edges}
        />
    )
    
}