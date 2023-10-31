"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
    const EDIT_MODE = ticket._id === 'new' ? false : true;

    const router = useRouter();
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((preState) => ({
            ...preState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (EDIT_MODE) {
            const res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: 'PUT',
                body: JSON.stringify({ formData }),
                'content-type': 'application/json'
            })

            if (!res.ok) {
                throw new Error('Failed to update Ticket.')
            }
        } else {
            const res = await fetch('/api/Tickets', {
                method: 'POST',
                body: JSON.stringify({ formData }),
                'content-type': 'application/json'
            })

            if (!res.ok) {
                throw new Error('Failed to create Ticket.')
            }
        }

        router.refresh()
        router.push('/')
    }

    const startingTicketData = {
        title: '',
        description: '',
        priority: 1,
        progress: 0,
        status: 'not started',
        category: 'Hardware Problem'
    };

    if (EDIT_MODE) {
        startingTicketData['title'] = ticket.title;
        startingTicketData['description'] = ticket.description;
        startingTicketData['priority'] = ticket.priority;
        startingTicketData['progress'] = ticket.progress;
        startingTicketData['status'] = ticket.status;
        startingTicketData['category'] = ticket.category;
    }

    const [formData, setFormData] = useState(startingTicketData);
    return (
        <div className="flex justify-center">
            <form className="flex flex-col w-1/2 gap-3" method="post" onSubmit={handleSubmit}>
                <h3>{EDIT_MODE ? "Update your Ticket" : "Create Your Ticket"}</h3>
                <label>Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    required
                    value={formData.title} />
                <label>Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    required
                    value={formData.description}
                    rows="5"
                />

                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Hardware Problem">Hardware Problem</option>
                    <option value="Software Problem">Software Problem</option>
                    <option value="Project">Project</option>
                </select>

                <label>Priority</label>
                <div>
                    <input type="radio" name="priority" id='priority-1' value={1} checked={formData.priority == 1} onChange={handleChange} />
                    <label>1</label>
                    <input type="radio" name="priority" id='priority-2' value={2} checked={formData.priority == 2} onChange={handleChange} />
                    <label>2</label>
                    <input type="radio" name="priority" id='priority-3' value={3} checked={formData.priority == 3} onChange={handleChange} />
                    <label>3</label>
                    <input type="radio" name="priority" id='priority-4' value={4} checked={formData.priority == 4} onChange={handleChange} />
                    <label>4</label>
                    <input type="radio" name="priority" id='priority-5' value={5} checked={formData.priority == 5} onChange={handleChange} />
                    <label>5</label>
                </div>

                <label>Progress</label>
                <input type="range" id='progress' name="progress" value={formData.progress} min='0' max='100' onChange={handleChange} />

                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="not started">Not Started</option>
                    <option value="started">Started</option>
                    <option value="done">Done</option>
                </select>
                <input type="submit" className="btn" value={EDIT_MODE ? "Update Ticket" : "Create Ticket"} />
            </form>
        </div>
    )
}

export default TicketForm;