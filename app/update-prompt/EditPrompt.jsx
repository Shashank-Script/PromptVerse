"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

function EditPrompt({ promptId }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };
        if (promptId) getPromptDetails();
    }, [promptId]);

    const UpdatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if (!promptId) return alert('Prompt ID not found');
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            submitting={submitting}
            post={post}
            setPost={setPost}
            handleSubmit={UpdatePrompt}
        />
    );
}

export default EditPrompt;