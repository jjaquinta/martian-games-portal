import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';
import { Container, Row, Col } from 'react-bootstrap';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container fluid className="flex-grow-1 d-flex align-items-center justify-content-center">
                <Row className="w-100">
                    <Col md={{ span: 8, offset: 2 }} className="text-center">
                        <div className="table-container fade-in-up" style={{ padding: '60px', marginTop: '40px' }}>
                            <h1 className="premium-header" style={{ fontSize: '4rem', marginBottom: '20px' }}>
                                {error?.status === 404 ? '404' : 'Oops!'}
                            </h1>
                            <h2 className="premium-text" style={{ fontSize: '2rem', color: '#4a9eff', marginBottom: '30px' }}>
                                {error?.status === 404 ? 'Page Not Found' : 'Unexpected Error'}
                            </h2>
                            <p className="premium-text" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
                                {error?.status === 404
                                    ? "It seems you've ventured too far into the Martian wasteland. This page doesn't exist."
                                    : "Something went wrong in the transmission. Our engineers are investigating."}
                            </p>

                            {error && error.status !== 404 && (
                                <div style={{ color: '#c0c8d4', marginBottom: '30px', textAlign: 'left', background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '8px' }}>
                                    <p><i>{error.statusText || error.message}</i></p>
                                </div>
                            )}

                            <Link to="/portal" className="refresh-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                Return to Dashboard
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default ErrorPage;
