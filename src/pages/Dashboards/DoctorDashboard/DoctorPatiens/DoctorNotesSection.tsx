import { useEffect, useRef, useState } from "react";
import type { User } from "../../../../data/generalTypes";
import { BsX } from "react-icons/bs";

// The note type remains the same
export type Note = {
    doc_id: string;
    id: string;
    text: string;
    patient_id: string;
}

interface DoctorNotesSectionProps {
    patient_id: string | undefined;
}

// Define a constant for the localStorage key
const NOTES_STORAGE_KEY = "sanad_doctor_notes_v2";

const DoctorNotesSection = ({ patient_id }: DoctorNotesSectionProps) => {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const [notes, setNotes] = useState<Note[]>([]);

    // Get doctor_id safely
    const user_data_raw = localStorage.getItem('user_data');
    const user_data: User | null = user_data_raw ? JSON.parse(user_data_raw) : null;
    const doctor_id = user_data?.id;

    // Effect for LOADING notes for the current patient
    useEffect(() => {
        // Only run if we have the necessary IDs
        if (!doctor_id || !patient_id) {
            setNotes([]); // Clear notes if IDs are not present
            return;
        }

        try {
            const allNotesRaw = localStorage.getItem(NOTES_STORAGE_KEY);
            if (allNotesRaw) {
                // The new structure is an object: { doctorId: { patientId: [notes] } }
                const allNotes = JSON.parse(allNotesRaw);
                const patientNotes = allNotes?.[doctor_id]?.[patient_id] || [];
                setNotes(patientNotes);
            } else {
                setNotes([]); // No notes found in storage
            }
        } catch (err) {
            console.error("Failed to parse notes from localStorage:", err);
            setNotes([]); // Reset state on error
        }
    }, [patient_id, doctor_id]); // Reruns when the patient or doctor changes

    const addNote = () => {
        // Ensure we have IDs and text before proceeding
        if (!textArea.current?.value.trim() || !doctor_id || !patient_id) {
            return;
        }

        const newNote: Note = {
            doc_id: doctor_id.toString(),
            // crypto.randomUUID() is a modern, reliable way to create unique IDs
            id: crypto.randomUUID(),
            patient_id: patient_id,
            text: textArea.current.value.trim()
        };

        try {
            // --- SAFER UPDATE LOGIC ---
            // 1. Read the entire notes object from storage
            const allNotesRaw = localStorage.getItem(NOTES_STORAGE_KEY);
            const allNotes = allNotesRaw ? JSON.parse(allNotesRaw) : {};

            // 2. Modify only the part that needs to change
            const currentPatientNotes = allNotes?.[doctor_id]?.[patient_id] || [];
            const updatedPatientNotes = [...currentPatientNotes, newNote];

            // 3. Place the updated notes back into the main object structure
            const updatedAllNotes = {
                ...allNotes,
                [doctor_id]: {
                    ...allNotes[doctor_id],
                    [patient_id]: updatedPatientNotes
                }
            };
            
            // 4. Write the entire updated object back to storage
            localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updatedAllNotes));

            // 5. Update the local state to refresh the UI
            setNotes(updatedPatientNotes);

            // 6. Clear the input
            if (textArea.current) {
                textArea.current.value = "";
            }

        } catch (err) {
            console.error("Failed to save note to localStorage:", err);
            // Optionally, inform the user that the note could not be saved
        }
    };

    // --- IMPLEMENTED DELETE FUNCTION ---
    const deleteNote = (noteIdToDelete: string) => {
        if (!doctor_id || !patient_id) {
            return;
        }

        try {
            // 1. Read all notes from storage
            const allNotesRaw = localStorage.getItem(NOTES_STORAGE_KEY);
            const allNotes = allNotesRaw ? JSON.parse(allNotesRaw) : {};

            // 2. Get the current notes for this patient and filter out the deleted one
            const currentPatientNotes = allNotes?.[doctor_id]?.[patient_id] || [];
            const updatedPatientNotes = currentPatientNotes.filter(
                (note: Note) => note.id !== noteIdToDelete
            );

            // 3. Place the updated notes back into the main object structure
            const updatedAllNotes = {
                ...allNotes,
                [doctor_id]: {
                    ...allNotes[doctor_id],
                    [patient_id]: updatedPatientNotes
                }
            };

            // 4. Write the updated object back to storage
            localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updatedAllNotes));

            // 5. Update the local state to refresh the UI immediately
            setNotes(updatedPatientNotes);

        } catch (err) {
            console.error("Failed to delete note from localStorage:", err);
        }
    };

    return (
        <section className="notes_section">
            <h2>الملاحظات</h2>
            <textarea placeholder="أضف ملاحظة..." ref={textArea} />
            <button onClick={addNote}>إضافة الملاحظة</button>
            <div className="notes_list">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="note_card">
                            <p>{note.text}</p>
                            {/* Pass the note's ID to the delete function */}
                            <button onClick={() => deleteNote(note.id)}>
                                <BsX />
                            </button>
                        </div>
                    ))
                ) : (
                    <p>لا توجد ملاحظات لهذا المريض.</p> // User-friendly empty state
                )}
            </div>
        </section>
    );
};

export default DoctorNotesSection;