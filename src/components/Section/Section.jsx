import React from 'react';
import PropTypes from 'prop-types';

import { SectionTag, Heading } from './Section.styled';

function Section({ title, children }) {
  return (
    <SectionTag>
      {title && <Heading>{title}</Heading>}
      {children}
    </SectionTag>
  );
}

Section.propTypes = {
  title: PropTypes.string,
};

export default Section;
