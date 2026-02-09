import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { CarFront, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <header
        className="text-white py-5 position-relative"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1510521212584-9336bc001150?auto=format&fit=crop&q=80&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4">
                Your Ride, <span className="text-success">On Demand.</span>
              </h1>
              <p className="lead mb-4">
                Reliable, safe, and affordable cabs at your doorstep.
              </p>
              <div className="d-flex gap-3">
                <Button variant="warning" size="lg" onClick={() => navigate('/login')}>
                  Book a Ride Now
                </Button>
                <Button variant="outline-light" size="lg">
                  Learn More
                </Button>
              </div>
            </Col>

            <Col lg={{ span: 5, offset: 1 }} className="mt-5 mt-lg-0">
              <Card className="text-white shadow-lg border-0 glass-card">
                <Card.Body className="p-4">
                  <h4 className="mb-4">Where are you going?</h4>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">PICKUP LOCATION</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <MapPin size={18} className="text-success" />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 glass-input"
                        placeholder="Enter pickup location"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold">DROP LOCATION</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <MapPin size={18} className="text-danger" />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 glass-input"
                        placeholder="Enter destination"
                      />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-100 py-2 fw-bold"
                    onClick={() => navigate('/login')}
                  >
                    Check Prices
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Features */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose CityCab?</h2>
            <p className="text-muted">
              We prioritize your comfort and safety.
            </p>
          </div>

          <Row className="g-4 text-center">
            <Col md={4}>
              <div className="p-4 glass-card rounded shadow-sm h-100 text-white">
                <ShieldCheck size={48} className="text-success mb-3" />
                <h5>Safe Rides</h5>
                <p className="small text-muted">
                  Verified drivers & GPS monitoring.
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="p-4 glass-card rounded shadow-sm h-100 text-white">
                <Clock size={48} className="text-success mb-3" />
                <h5>Fast Arrival</h5>
                <p className="small text-muted">
                  Cab reaches you in under 5 minutes.
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="p-4 glass-card rounded shadow-sm h-100 text-white">
                <CarFront size={48} className="text-success mb-3" />
                <h5>Best Prices</h5>
                <p className="small text-muted">
                  Transparent pricing. No hidden charges.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container className="text-center">
          <p className="mb-0">
            © 2026 QuickCab Technologies. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default Landing;
