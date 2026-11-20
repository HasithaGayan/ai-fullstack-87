
"use client";

import {
    useEffect,
    useState,
    type FormEvent,
} from "react";

import {
    isRecord,
    isNote,
    isNoteList,
    type Note,
} from "@/lib/notes";

async function readApiResponse<T>(
    response: Response,
    validate: (value: unknown) => value is T
): Promise<T> {
    const payload: unknown =
        await response.json();

    if (!isRecord(payload)) {
        throw new Error(
            "Invalid API response."
        );
    }

    if (!response.ok || payload.ok !== true) {
        const error = payload.error;

        const message =
            isRecord(error) &&
            typeof error.message === "string"
                ? error.message
                : "The API request failed.";

        throw new Error(
            `HTTP ${response.status}: ${message}`
        );
    }

    if (!validate(payload.data)) {
        throw new Error(
            "Invalid response data."
        );
    }

    return payload.data;
}

export default function NotesLabPage() {
    const [notes, setNotes] =
        useState<Note[]>([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [accessKey, setAccessKey] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [loadError, setLoadError] =
        useState("");

    const [submitError, setSubmitError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    useEffect(() => {
        const controller =
            new AbortController();

        async function loadNotes() {
            try {
                const response = await fetch(
                    "/api/notes",
                    {
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                const data =
                    await readApiResponse(
                        response,
                        isNoteList
                    );

                if (!controller.signal.aborted) {
                    setNotes(data);
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    setLoadError(
                        error instanceof Error
                            ? error.message
                            : "Unable to load notes."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        void loadNotes();

        return () => controller.abort();
    }, []);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setSubmitting(true);
        setSubmitError("");
        setSuccess("");

        try {
            const response = await fetch(
                "/api/notes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${accessKey}`,
                    },
                    body: JSON.stringify({
                        title,
                        content,
                    }),
                    signal:
                        AbortSignal.timeout(10000),
                }
            );

            const note = await readApiResponse(
                response,
                isNote
            );

            setNotes(previous => [
                ...previous,
                note,
            ]);

            setTitle("");
            setContent("");

            setSuccess(
                `HTTP ${response.status}: Note created successfully.`
            );
        } catch (error) {
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Unable to create note."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section>
            <h1>NotesLab</h1>

            <p>
                Day 34 - Internal REST API
                Demonstration
            </p>

            <article className="card">
                <h2>Total Notes</h2>
                <strong>{notes.length}</strong>
            </article>

            <article
                className="card"
                style={{ marginTop: 20 }}
            >
                <h2>Create a Note</h2>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "grid",
                        gap: 12,
                    }}
                >
                    <label htmlFor="note-title">
                        Note Title
                    </label>

                    <input
                        id="note-title"
                        value={title}
                        onChange={event =>
                            setTitle(
                                event.target.value
                            )
                        }
                        placeholder="Enter title"
                        maxLength={80}
                        required
                        style={{ padding: 12 }}
                    />

                    <label htmlFor="note-content">
                        Note Content
                    </label>

                    <textarea
                        id="note-content"
                        value={content}
                        onChange={event =>
                            setContent(
                                event.target.value
                            )
                        }
                        placeholder="Write your note"
                        maxLength={300}
                        rows={4}
                        required
                        style={{ padding: 12 }}
                    />

                    <label htmlFor="access-key">
                        Demo Access Key
                    </label>

                    <input
                        id="access-key"
                        type="password"
                        autoComplete="off"
                        value={accessKey}
                        onChange={event =>
                            setAccessKey(
                                event.target.value
                            )
                        }
                        style={{ padding: 12 }}
                    />

                    <button
                        type="submit"
                        className="button"
                        disabled={
                            loading ||
                            submitting ||
                            Boolean(loadError)
                        }
                    >
                        {submitting
                            ? "Creating..."
                            : "Create Note"}
                    </button>

                    {success && (
                        <p
                            role="status"
                            style={{
                                color: "#4ade80",
                            }}
                        >
                            {success}
                        </p>
                    )}

                    {submitError && (
                        <p
                            role="alert"
                            style={{
                                color: "#f87171",
                            }}
                        >
                            {submitError}
                        </p>
                    )}
                </form>
            </article>

            <h2>Available Notes</h2>

            {loading && (
                <p role="status">
                    Loading notes...
                </p>
            )}

            {loadError && (
                <section role="alert">
                    <p>{loadError}</p>

                    <button
                        className="button"
                        onClick={() =>
                            window.location.reload()
                        }
                    >
                        Try Again
                    </button>
                </section>
            )}

            {!loading &&
                !loadError &&
                notes.length === 0 && (
                    <p>No notes available.</p>
                )}

            <div className="card-grid">
                {notes.map(note => (
                    <article
                        className="card"
                        key={note.id}
                    >
                        <h2>{note.title}</h2>
                        <p>Note #{note.id}</p>
                        <p>{note.content}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
