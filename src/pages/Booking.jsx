import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Clock, CreditCard, Car } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Booking = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);
    const [confirmedRide, setConfirmedRide] = useState(null);
    const [otp, setOtp] = useState('');

    // Mock driver data
    const rideOptions = [
        { id: 1, name: 'UberX', eta: '5 min', price: '₹150-200', capacity: 4, type: 'Standard' },
        { id: 2, name: 'UberXL', eta: '8 min', price: '₹250-320', capacity: 6, type: 'Large' },
        { id: 3, name: 'Luxury', eta: '12 min', price: '₹450-600', capacity: 3, type: 'Luxury' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pickup && destination) {
            setShowOptions(true);
            setConfirmedRide(null); // Reset confirmation if searching again
        }
    };

    const handleConfirmBooking = () => {
        if (!selectedRide) return;

        // Generate random 4-digit OTP
        const randomOtp = Math.floor(1000 + Math.random() * 9000);
        setOtp(randomOtp);

        const rideDetails = rideOptions.find(r => r.id === selectedRide);
        setConfirmedRide(rideDetails);
    };

    return (
        <Container fluid className="px-3 pb-3 d-flex flex-column" style={{ height: 'calc(100vh - 86px)' }}>
            <div className="flex-grow-1 position-relative rounded-4 overflow-hidden border border-white border-opacity-10 glass-panel">
                <Row className="h-100 m-0">
                    {/* Left Panel - Booking Form & Options */}
                    <Col md={4} className="p-4 overflow-auto position-relative" style={{ zIndex: 1000, height: '100%', background: 'rgba(0,0,0,0.6)' }}>
                        <h4 className="fw-bold mb-4 text-white">Book a Ride</h4>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="d-flex align-items-center gap-2 text-muted small fw-bold">
                                    <MapPin size={16} className="text-success" /> PICKUP LOCATION
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="glass-input"
                                    placeholder="Current Location"
                                    value={pickup}
                                    onChange={(e) => setPickup(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="d-flex align-items-center gap-2 text-muted small fw-bold">
                                    <Navigation size={16} className="text-danger" /> DROP-OFF LOCATION
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="glass-input"
                                    placeholder="Enter Destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {!showOptions && (
                                <Button variant="primary" type="submit" className="w-100 py-2">
                                    Find Ride
                                </Button>
                            )}
                        </Form>

                        {showOptions && !confirmedRide && (
                            <div className="mt-4 fade-in">
                                <h6 className="text-muted mb-3">Available Rides</h6>
                                <ListGroup variant="flush">
                                    {rideOptions.map(ride => (
                                        <ListGroup.Item
                                            key={ride.id}
                                            action
                                            className={`border rounded mb-2 d-flex justify-content-between align-items-center ${selectedRide === ride.id ? 'border-dark bg-light' : ''}`}
                                            onClick={() => setSelectedRide(ride.id)}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-light p-2 rounded-circle">
                                                    <Car size={24} />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-bold">{ride.name}</h6>
                                                    <small className="text-muted d-flex align-items-center gap-1">
                                                        <Clock size={12} /> {ride.eta} away
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <h6 className="mb-0 fw-bold">{ride.price}</h6>
                                                <Badge bg="secondary" className="fw-normal">{ride.capacity} seats</Badge>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                                <Button
                                    variant="success"
                                    className="w-100 mt-3 py-2 fw-bold"
                                    disabled={!selectedRide}
                                    onClick={handleConfirmBooking}
                                >
                                    Confirm Booking
                                </Button>
                            </div>
                        )}

                        {confirmedRide && (
                            <div className="mt-4 fade-in">
                                <Card className="border-0 glass-card mb-3">
                                    <Card.Body className="text-center text-white">
                                        <div className="mb-3 text-success">
                                            <Car size={48} />
                                        </div>
                                        <h5 className="fw-bold text-success mb-1">Booking Confirmed!</h5>
                                        <p className="text-muted small mb-3">Your ride is on the way.</p>

                                        <div className="glass-panel p-3 rounded border-0 mb-3">
                                            <h2 className="mb-0 letter-spacing-2 fw-bold text-success">{otp}</h2>
                                            <small className="text-muted">OTP for Ride Matching</small>
                                        </div>

                                        <div className="d-flex justify-content-between border-top pt-3">
                                            <div className="text-start">
                                                <small className="text-muted d-block">Vehicle</small>
                                                <span className="fw-bold">{confirmedRide.name}</span>
                                            </div>
                                            <div className="text-end">
                                                <small className="text-muted d-block">Est. Fare</small>
                                                <span className="fw-bold">{confirmedRide.price}</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Button
                                    variant="outline-light"
                                    className="w-100"
                                    onClick={() => {
                                        setConfirmedRide(null);
                                        setShowOptions(false);
                                        setSelectedRide(null);
                                        setPickup('');
                                        setDestination('');
                                    }}
                                >
                                    Book Another Ride
                                </Button>
                            </div>
                        )}
                    </Col>

                    {/* Right Panel - Map */}
                    <Col md={8} className="p-0">
                        {/* Placeholder Map - In real app, you'd use dynamic coords */}
                        <MapContainer
                            center={[20.2961, 85.8245]} // Bhubaneswar coordinates as example or default
                            zoom={13}
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {/* Example Markers */}
                            <Marker position={[20.2961, 85.8245]}>
                                <Popup>Current Location</Popup>
                            </Marker>

                            {/* Simulation of nearby drivers */}
                            <Marker position={[20.30, 85.83]} icon={DefaultIcon}>
                                <Popup>Driver 1 (UberX)</Popup>
                            </Marker>
                            <Marker position={[20.29, 85.81]} icon={DefaultIcon}>
                                <Popup>Driver 2 (UberXL)</Popup>
                            </Marker>

                            {/* Destination Marker (Dummy) */}
                            <Marker position={[20.31, 85.84]}>
                                <Popup>Destination</Popup>
                            </Marker>
                        </MapContainer>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default Booking;
