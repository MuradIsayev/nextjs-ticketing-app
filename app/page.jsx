import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/Tickets', {
      cache: 'no-store'
    })

    return res.json();
  } catch (error) {
    console.log('Failed to get Tickets', error);
  }
}

const Dashboard = async () => {
  const { tickets } = await getTickets()

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category))
  ];

  return (
    <div className="p-5">
      <div>
        {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div className="mb-4" key={categoryIndex}>
            <h3>{uniqueCategory}</h3>
            <div className="grid-cols-2 md:grid lg:grid-cols-3">
              {tickets.filter((ticket) => ticket.category === uniqueCategory).map((filteredTicket, _index) => (
                <TicketCard id={_index} key={_index} ticket={filteredTicket} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;