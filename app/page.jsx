import TicketCard from "./(components)/TicketCard";

const Dashboard = () => {
  return (
    <div className="p-5">
      <div className="grid-cols-2 md:grid lg:grid-cols-3">
        <TicketCard />
        <TicketCard />
        <TicketCard />
      </div>
    </div>
  )
}

export default Dashboard;