import React, { PropTypes, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { createSelector } from 'reselect';
import { Button, Col, Image, Row } from 'react-bootstrap';

import ns from './ns.json';
import {
  currentIndexSelector,
  nextQuestion
} from './redux';

import { challengeSelector } from '../../../../redux';

const mapStateToProps = createSelector(
  challengeSelector,
  currentIndexSelector,
  (
    {
      description = [],
      title
    },
    currentIndex,
  ) => ({
    title,
    description,
    currentIndex
  })
);

function mapDispatchToProps(dispatch) {
  return () => bindActionCreators({
    nextQuestion
  }, dispatch);
}

const propTypes = {
  currentIndex: PropTypes.number
};

export class QuizChallenge extends PureComponent {
  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const currentIndex = this.props.currentIndex;
    const question = this.props.description[currentIndex];
    return (
      <div>
        <Row>
          <Col md={12}>
            {this.props.title}
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h1>
              Question #{currentIndex + 1}
            </h1>

            <p dangerouslySetInnerHTML={{__html: question.question}}></p>
          </Col>

          <Col md={6}>
            <h1>Choices</h1>

            {question.choices.map(choice => (
              <div dangerouslySetInnerHTML={{__html: choice}}></div>
            ))}
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <button onClick={this.props.nextQuestion}>Next Question</button>
          </Col>
        </Row>
      </div>
    );
  }
}

QuizChallenge.displayName = 'QuizChallenge';
QuizChallenge.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizChallenge);
