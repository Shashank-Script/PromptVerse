import EditPrompt from './EditPrompt';

export default function UpdatePromptPage({ searchParams }) {
    const promptId = searchParams.id;

    return <EditPrompt promptId={promptId} />;
}