
"use client";

import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
} from "react";

import {
    TextField,
    SelectField,
    FormButton,
} from "@/components/FormFields";

import {
    priorities,
    validateProject,
    isRecord,
    isProject,
    isProjectList,
    type Project,
    type FieldErrors,
} from "@/lib/form-projects";

export default function FormLabPage() {

    const [projects, setProjects] =
        useState<Project[]>([]);

    const [name, setName] =
        useState("");

    const [priority, setPriority] =
        useState("Medium");

    const [writeKey, setWriteKey] =
        useState("");

    const [editId, setEditId] =
        useState<number | null>(null);

    const [errors, setErrors] =
        useState<FieldErrors>({});

    const [keyError, setKeyError] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [globalError, setGlobalError] =
        useState("");

    const [loadError, setLoadError] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [pending, setPending] =
        useState(false);

    const [reload, setReload] =
        useState(0);

    const [focusTarget, setFocusTarget] =
        useState<{ id: string } | null>(
            null
        );

    const submitting = useRef(false);

    useEffect(() => {

        const controller =
            new AbortController();

        async function loadProjects() {
            try {
                const response = await fetch(
                    "/api/form-lab",
                    {
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                const body: unknown =
                    await response.json();

                if (
                    !response.ok ||
                    !isRecord(body) ||
                    body.ok !== true ||
                    !isProjectList(body.data)
                ) {
                    throw new Error(
                        "Invalid project response."
                    );
                }

                if (!controller.signal.aborted) {
                    setProjects(body.data);
                }
            } catch {
                if (!controller.signal.aborted) {
                    setLoadError(
                        "Unable to load projects. Try again."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        void loadProjects();

        return () => controller.abort();

    }, [reload]);

    useEffect(() => {
        if (!pending && focusTarget) {
            document
                .getElementById(focusTarget.id)
                ?.focus();
        }
    }, [focusTarget, pending]);

    function resetForm() {
        setName("");
        setPriority("Medium");
        setEditId(null);
        setErrors({});
        setKeyError("");
        setGlobalError("");
    }

    function startEditing(project: Project) {
        setEditId(project.id);
        setName(project.name);
        setPriority(project.priority);
        setErrors({});
        setKeyError("");
        setGlobalError("");
        setMessage("");

        setFocusTarget({
            id: "project-name",
        });
    }

    function showFieldErrors(
        fieldErrors: FieldErrors
    ) {
        setErrors(fieldErrors);

        setFocusTarget({
            id: fieldErrors.name
                ? "project-name"
                : fieldErrors.priority
                    ? "project-priority"
                    : "form-error",
        });
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (
            submitting.current ||
            loading ||
            loadError
        ) {
            return;
        }

        setMessage("");
        setGlobalError("");
        setErrors({});
        setKeyError("");

        // Client-side validation
        const result = validateProject({
            name,
            priority,
        });

        if (!result.ok) {
            showFieldErrors(result.errors);
            return;
        }

        if (!writeKey.trim()) {
            setKeyError(
                "Enter the local demo write key."
            );

            setFocusTarget({
                id: "write-key",
            });

            return;
        }

        // Immediate duplicate-submission guard
        submitting.current = true;

        setPending(true);

        const editing = editId !== null;

        const url = editing
            ? `/api/form-lab?id=${editId}`
            : "/api/form-lab";

        try {
            const response = await fetch(
                url,
                {
                    method: editing
                        ? "PATCH"
                        : "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${writeKey}`,
                    },

                    body: JSON.stringify(
                        result.data
                    ),

                    signal:
                        AbortSignal.timeout(10000),
                }
            );

            const body: unknown =
                await response.json();

            if (
                !response.ok ||
                !isRecord(body) ||
                body.ok !== true
            ) {
                const apiError =
                    isRecord(body) &&
                    isRecord(body.error)
                        ? body.error
                        : {};

                const fieldErrors: FieldErrors =
                    {};

                if (isRecord(apiError.fieldErrors)) {

                    if (
                        typeof apiError.fieldErrors.name
                        === "string"
                    ) {
                        fieldErrors.name =
                            apiError.fieldErrors.name;
                    }

                    if (
                        typeof apiError.fieldErrors.priority
                        === "string"
                    ) {
                        fieldErrors.priority =
                            apiError.fieldErrors.priority;
                    }
                }

                setGlobalError(
                    typeof apiError.message === "string"
                        ? apiError.message
                        : "Unable to save the project."
                );

                if (response.status === 401) {
                    setKeyError(
                        "Check your demo write key."
                    );

                    setFocusTarget({
                        id: "write-key",
                    });
                } else {
                    showFieldErrors(fieldErrors);
                }

                return;
            }

            if (!isProject(body.data)) {
                throw new Error(
                    "Invalid project response."
                );
            }

            const saved = body.data;

            setProjects(current =>
                editing
                    ? current.map(project =>
                        project.id === saved.id
                            ? saved
                            : project
                    )
                    : [...current, saved]
            );

            resetForm();

            setMessage(
                editing
                    ? "Project updated successfully."
                    : "Project created successfully."
            );

            setFocusTarget({
                id: "project-name",
            });

        } catch {
            setGlobalError(
                "Could not confirm the save. Reload projects before retrying."
            );

            setFocusTarget({
                id: "form-error",
            });

        } finally {
            submitting.current = false;

            setPending(false);
        }
    }

    function retryLoad() {
        setLoadError("");
        setLoading(true);
        setReload(value => value + 1);
    }

    return (
        <section>
            <h1>FormLab</h1>

            <p>
                Day 37 - Forms, Mutations
                and Accessible Validation
            </p>

            <article
                className="card"
                style={{ maxWidth: 620 }}
            >
                <h2>
                    {editId === null
                        ? "Create Project"
                        : `Edit Project #${editId}`}
                </h2>

                <form
                    noValidate
                    onSubmit={handleSubmit}
                    aria-busy={pending}
                >
                    <fieldset
                        disabled={
                            pending ||
                            loading ||
                            Boolean(loadError)
                        }
                        style={{
                            border: 0,
                            padding: 0,
                            margin: 0,
                            minWidth: 0,
                        }}
                    >
                        <TextField
                            id="project-name"
                            label="Project name"
                            name="name"
                            value={name}
                            onChange={event =>
                                setName(event.target.value)
                            }
                            error={errors.name}
                            placeholder="Enter project name"
                            required
                        />

                        <SelectField
                            id="project-priority"
                            label="Priority"
                            name="priority"
                            value={priority}
                            onChange={event =>
                                setPriority(
                                    event.target.value
                                )
                            }
                            options={priorities}
                            error={errors.priority}
                            required
                        />

                        <TextField
                            id="write-key"
                            label="Local demo write key"
                            type="password"
                            value={writeKey}
                            onChange={event =>
                                setWriteKey(event.target.value)
                            }
                            error={keyError}
                            autoComplete="off"
                            required
                        />

                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 12,
                        }}>
                            <FormButton
                                type="submit"
                                pending={pending}
                            >
                                {editId === null
                                    ? "Create Project"
                                    : "Save Changes"}
                            </FormButton>

                            {editId !== null && (
                                <FormButton
                                    onClick={() => {
                                        resetForm();
                                        setMessage("");
                                        setFocusTarget({
                                            id: "project-name",
                                        });
                                    }}
                                >
                                    Cancel
                                </FormButton>
                            )}
                        </div>
                    </fieldset>
                </form>

                {globalError && (
                    <p
                        id="form-error"
                        tabIndex={-1}
                        role="alert"
                        style={{ color: "#fca5a5" }}
                    >
                        {globalError}
                    </p>
                )}

                <p
                    role="status"
                    aria-live="polite"
                    style={{ color: "#4ade80" }}
                >
                    {message}
                </p>
            </article>

            <section style={{ marginTop: 24 }}>
                <h2>Projects</h2>

                {loading && (
                    <p role="status">
                        Loading projects...
                    </p>
                )}

                {loadError && (
                    <article className="card">
                        <p role="alert">
                            {loadError}
                        </p>

                        <FormButton
                            onClick={retryLoad}
                        >
                            Try Again
                        </FormButton>
                    </article>
                )}

                {!loading && !loadError && (
                    <>
                        <p>{projects.length} records</p>

                        <FormButton
                            onClick={retryLoad}
                            disabled={pending}
                        >
                            Reload Projects
                        </FormButton>

                        {projects.length === 0 && (
                            <p>No projects available.</p>
                        )}

                        <div
                            className="card-grid"
                            style={{ marginTop: 16 }}
                        >
                            {projects.map(project => (
                                <article
                                    key={project.id}
                                    className="card"
                                >
                                    <h3>
                                        {project.name}
                                    </h3>

                                    <p>ID: {project.id}</p>

                                    <p>
                                        Priority:
                                        {" "}
                                        {project.priority}
                                    </p>

                                    <FormButton
                                        disabled={pending}
                                        onClick={() =>
                                            startEditing(
                                                project
                                            )
                                        }
                                        aria-label={
                                            `Edit ${project.name}`
                                        }
                                    >
                                        Edit
                                    </FormButton>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </section>
    );
}
