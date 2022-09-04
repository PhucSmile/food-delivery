import React from 'react';
import './SectionFoods.scss';

import Container from 'react-bootstrap/Container';

const SectionFoods = ({ title }) => {
    return (
        <section className="section__food">
            <Container>
                <h2>{title}</h2>
            </Container>
        </section>
    );
};

export default SectionFoods;
