import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Nav,
  Navbar
} from 'react-bootstrap';
import {
  LayoutDashboard,
  Car,
  Clock,
  User,
  LogOut,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const username = currentUser?.name || 'User';

  const stats = [
    {
      title: 'Total Rides',
      value: '12',
      icon: <Car className="text-primary" />,
      color: 'border-primary'
    },
    {
      title: 'Active Bookings',
      value: '1',
      icon: <Clock className="text-warning" />,
      color: 'border-warning'
    },
    {
      title: 'Total Spent',
      value: '₹240.50',
      icon: <TrendingUp className="text-success" />,
      color: 'border-success'
    }
  ];

  const recentRides = [
    {
      id: '#1024',
      date: '2023-10-24',
      destination: 'Central Park',
      status: 'Completed',
      fare: '₹25.00'
    },
    {
      id: '#1025',
      date: '2023-10-25',
      destination: 'Airport Terminal 2',
      status: 'Pending',
      fare: '₹45.00'
    },
    {
      id: '#1026',
      date: '2023-10-26',
      destination: 'Downtown Mall',
      status: 'Cancelled',
      fare: '₹0.00'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>

      {/* SIDEBAR */}
      <div
        className="glass-panel p-3 d-none d-md-block m-3 rounded-4"
        style={{ width: '250px' }}
      >
        <h4 className="fw-bold mb-4 px-2">QuickCab</h4>

        <Nav className="flex-column gap-2">
          <Nav.Link className="text-dark bg-success rounded d-flex align-items-center gap-2 fw-bold">
            <LayoutDashboard size={20} /> Dashboard
          </Nav.Link>

          <Nav.Link
            className="text-white-50 d-flex align-items-center gap-2"
            onClick={() => navigate('/book')}
          >
            <MapPin size={20} /> Book a Ride
          </Nav.Link>

          <Nav.Link className="text-white-50 d-flex align-items-center gap-2">
            <User size={20} /> Profile
          </Nav.Link>

          <hr />

          <Nav.Link
            className="text-danger d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={20} /> Logout
          </Nav.Link>
        </Nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1">

        <Navbar className="shadow-sm px-4 mb-4 glass-panel rounded-4 mt-3 mx-3">
          <Navbar.Brand className="fw-bold text-white">
            Welcome back, {username} 👋
          </Navbar.Brand>

          <Navbar.Collapse className="justify-content-end">
            <Button
              variant="outline-light"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Navbar>

        <Container fluid className="px-4">

          {/* STATS */}
          <Row className="mb-4">
            {stats.map((item, idx) => (
              <Col md={4} key={idx} className="mb-3">
                <Card
                  className={`border-0 glass-card h-100 text-white`}
                >
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted small fw-bold mb-1">
                        {item.title}
                      </p>
                      <h3 className="fw-bold mb-0">
                        {item.value}
                      </h3>
                    </div>
                    <div className="glass-input p-3 rounded-circle">
                      {item.icon}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* RECENT RIDES */}
          <Card className="glass-card border-0 mb-4">
            <Card.Header className="bg-transparent border-bottom border-secondary py-3">
              <h5 className="mb-0 fw-bold text-white">Recent Rides</h5>
            </Card.Header>

            <Card.Body>
              <Table responsive hover variant="dark" className="mb-0 bg-transparent">
                <thead>
                  <tr className="text-muted">
                    <th>Ride ID</th>
                    <th>Date</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Fare</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRides.map((ride) => (
                    <tr key={ride.id} className="align-middle">
                      <td className="fw-bold text-success">{ride.id}</td>
                      <td>{ride.date}</td>
                      <td>{ride.destination}</td>
                      <td>
                        <span
                          className={`badge ${ride.status === 'Completed'
                            ? 'bg-success text-dark'
                            : ride.status === 'Pending'
                              ? 'bg-warning text-dark'
                              : 'bg-danger text-white'
                            }`}
                        >
                          {ride.status}
                        </span>
                      </td>
                      <td>{ride.fare}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

        </Container>
      </div>
    </div>
  );
};

export default Home;
