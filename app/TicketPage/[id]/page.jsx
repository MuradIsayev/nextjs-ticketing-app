import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error("Failed to get Ticket.")
    }

    return res.json();
}

const TicketPage = async ({ params }) => {
    const EDIT_MODE = params.id === 'new' ? false : true;
    let updateTicketData = {}

    if (EDIT_MODE) {
        updateTicketData = await getTicketById(params.id);
        updateTicketData = updateTicketData.foundTicket;
    } else {
        updateTicketData = {
            _id: 'new'
        }
    }

    return <TicketForm ticket={updateTicketData} />

}

export default TicketPage;