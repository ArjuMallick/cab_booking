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
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    // ✅ Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // ✅ Get registered user
    const storedUser = JSON.parse(
      localStorage.getItem('registeredUser')
    );

    if (!storedUser) {
      setError('No account found. Please register first.');
      return;
    }

    // ✅ Compare credentials
    if (
      email.trim() === storedUser.email &&
      password === storedUser.password
    ) {
      // ✅ Save logged-in session
      login({
        name: storedUser.name,
        email: storedUser.email
      });

      navigate('/home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>

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
                  <h2 className="fw-bold">Welcome Back</h2>
                  <p className="text-muted">
                    Login to book your next ride
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="py-2">
                    {error}
                  </Alert>
                )}

                <Form>

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
                    <Form.Label className="small fw-bold">
                      PASSWORD
                    </Form.Label>
                    <div className="input-group">
                      <span className="input-group-text glass-input border-end-0 text-muted">
                        <Lock size={18} />
                      </span>
                      <Form.Control
                        type="password"
                        className="glass-input border-start-0"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="w-100 mb-3 py-2 fw-bold"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>

                  <div className="text-center">
                    <p className="small text-muted mb-0">
                      Don&apos;t have an account?{' '}
                      <span
                        className="text-success fw-bold"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/register')}
                      >
                        Register Here
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

export default Login;
