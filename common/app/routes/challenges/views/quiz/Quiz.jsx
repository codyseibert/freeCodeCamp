import React, { PropTypes, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { createSelector } from 'reselect';
import { Button, Col, Image, Row } from 'react-bootstrap';
import Choice from './Choice.jsx'

import ns from './ns.json';
import {
  currentIndexSelector,
  selectedChoiceSelector,
  nextQuestion,
  selectChoice,
  correctSelector,
  incrementCorrect,
  resetQuiz,
  resetChoice
} from './redux';

import { submitChallenge } from '../../redux';
import { challengeMetaSelector } from '../../redux';
import { challengeSelector } from '../../../../redux';

const mapStateToProps = createSelector(
  challengeSelector,
  challengeMetaSelector,
  currentIndexSelector,
  selectedChoiceSelector,
  correctSelector,
  (
    {
      description = [],
      title
    },
    meta,
    currentIndex,
    selectedChoice,
    correct
  ) => ({
    title,
    description,
    meta,
    currentIndex,
    selectedChoice,
    correct
  })
);

function mapDispatchToProps(dispatch) {
  return () => bindActionCreators({
    nextQuestion,
    selectChoice,
    incrementCorrect,
    resetQuiz,
    resetChoice,
    submitChallenge
  }, dispatch);
}

const propTypes = {
  currentIndex: PropTypes.number,
  selectedChoice: PropTypes.number,
  correct: PropTypes.number,
};

export class QuizChallenge extends PureComponent {

  constructor(props) {
    super(props)
    this.nextQuestion = this.nextQuestion.bind(this)
    this.submitChallenge = this.submitChallenge.bind(this)
  }

  nextQuestion () {
    this.props.resetChoice();
    this.props.nextQuestion();
  }

  submitChallenge () {
    this.props.resetQuiz();
    this.props.submitChallenge();
  }

  renderTitle() {
    return (
      <Row className="quizTitle">
        <Col md={12}>
          <h4>{this.props.meta.title}</h4>
          <hr/>
        </Col>
      </Row>
    )
  }

  renderResults() {
    const isQuizPassed = this.props.correct === this.props.description.length;
    return (
      <div>
        {this.renderTitle()}
        <Row className="quizResults">
          <Col md={12}>
            <h2>Quiz Results:</h2>

            <p>You got {this.props.correct} out of {this.props.description.length} correct!</p>

            {isQuizPassed === false ? (
              <div>
                <p>You'll need to get all the questions correct in order to mark this quiz as completed.</p>
                <button
                  className="btn btn-lg btn-primary"
                  onClick={this.props.resetQuiz}>Try Again</button>
              </div>
            ) : (
              <button
                className="btn btn-lg btn-primary"
                onClick={this.submitChallenge}>Finish Quiz</button>
            )}
          </Col>
        </Row>
      </div>
    )
  }

  renderQuiz() {
    const selectChoice = this.selectChoice;
    const currentIndex = this.props.currentIndex;
    const question = this.props.description[currentIndex];
    return (
      <div className="quiz">
        {this.renderTitle()}
        <Row>
          <Col md={6}>
            <h2 className="textCenter">
              Question {currentIndex + 1} of {this.props.description.length}:
            </h2>

            <h3>
              {question.subtitle}:
            </h3>

            <p dangerouslySetInnerHTML={{__html: question.question}}></p>
          </Col>

          <Col md={6}>
            <h2 className="textCenter">Choices</h2>

            {question.choices.map((choice, i) => (
              <Choice
                key={choice}
                selected={i === this.props.selectedChoice}
                isCorrectChoice={question.answer === i}
                isChoiceSelected={this.props.selectedChoice !== null}
                choiceIndex={i}
                choice={choice}></Choice>
            ))}
          </Col>
        </Row>

        {this.props.selectedChoice !== null &&
          <Row className="quizResults">
            <Col md={6} mdPush={3}>
  						<div className='messageDiv'>
  							{this.props.selectedChoice === question.answer
  								? <h2 className='correctAnswer'>Correct, great work!</h2>
  								: <h2 className='wrongAnswer'>Sorry, that is not correct!</h2>}
              </div>
              {this.props.selectedChoice !== question.answer &&
              <div className='explanation'>
                <h2>Explanation:</h2>
                <p dangerouslySetInnerHTML={{__html: question.explanation}}></p>
              </div>}
            </Col>

            <Col md={12}>
              <button
                className="btn btn-lg btn-primary"
                onClick={this.nextQuestion}>
                {currentIndex + 1 === this.props.description.length ? 'View Results' : 'Next Question'}
              </button>
            </Col>
          </Row>}
      </div>
    );
  }

  render() {
    return this.props.currentIndex >= this.props.description.length ?
      this.renderResults() : this.renderQuiz()
  }
}

QuizChallenge.displayName = 'QuizChallenge';
QuizChallenge.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizChallenge);
