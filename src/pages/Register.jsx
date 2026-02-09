import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert
} from 'react-bootstrap';
import { User, Mail, Lock, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');

    // ✅ Validation
    if (!name || !phone || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!agree) {
      setError('Please accept Terms & Privacy Policy');
      return;
    }

    // ✅ Save registered user
    localStorage.setItem(
      'registeredUser',
      JSON.stringify({
        name,
        phone,
        email: email.trim(),
        password
      })
    );



    navigate('/login');
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={6}>

            {/* Back */}
            <Button
              variant="link"
              className="text-decoration-none text-light mb-3 p-0 d-flex align-items-center"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={18} className="me-1" /> Back to Home
            </Button>

            <Card className="glass-card text-white border-0">
              <Card.Body className="p-5">

                <div className="text-center mb-4">
                  <h2 className="fw-bold">Create Account</h2>
                  <p className="text-muted">
                    Join CityCab and start traveling
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="py-2">
                    {error}
                  </Alert>
                )}

                <Form>

                  {/* Name */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-muted">
                      FULL NAME
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text glass-input border-end-0 text-muted">
                        <User size={18} />
                      </span>
                      <Form.Control
                        type="text"
                        className="glass-input border-start-0"
                        placeholder="John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                  </Form.Group>

                  {/* Phone */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-muted">
                      PHONE NUMBER
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text glass-input border-end-0 text-muted">
                        <Phone size={18} />
                      </span>
                      <Form.Control
                        type="tel"
                        className="glass-input border-start-0"
                        placeholder="9876543210"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold text-muted">
                      EMAIL ADDRESS
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text glass-input border-end-0 text-muted">
                        <Mail size={18} />
                      </span>
                      <Form.Control
                        type="email"
                        className="glass-input border-start-0"
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold text-muted">
                      SET PASSWORD
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text glass-input border-end-0 text-muted">
                        <Lock size={18} />
                      </span>
                      <Form.Control
                        type="password"
                        className="glass-input border-start-0"
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </Form.Group>

                  {/* Terms */}
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label="I agree to the Terms of Service and Privacy Policy"
                      checked={agree}
                      onChange={e => setAgree(e.target.checked)}
                      className="small text-muted"
                    />
                  </Form.Group>

                  {/* Register */}
                  <Button
                    variant="primary"
                    className="w-100 py-2 fw-bold mb-3"
                    onClick={handleRegister}
                  >
                    Create Account
                  </Button>

                  {/* Login */}
                  <div className="text-center">
                    <p className="small text-muted mb-0">
                      Already have an account?{' '}
                      <span
                        className="text-white fw-bold"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/login')}
                      >
                        Login instead
                      </span>
                    </p>
                  </div>

                </Form>

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
