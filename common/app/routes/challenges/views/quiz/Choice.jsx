import React, { PropTypes, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { createSelector } from 'reselect';
import { Button, Col, Image, Row } from 'react-bootstrap';

import ns from './ns.json';
import {
  selectChoice,
  incrementCorrect
} from './redux';

const mapStateToProps = createSelector(
  () => ({})
);

function mapDispatchToProps(dispatch) {
  return () => bindActionCreators({
    selectChoice,
    incrementCorrect
  }, dispatch);
}

const propTypes = {
  choiceIndex: PropTypes.number,
  choice: PropTypes.string,
  selected: PropTypes.bool,
  isCorrectChoice: PropTypes.bool,
  isChoiceSelected: PropTypes.bool
};

export class Choice extends PureComponent {

  constructor(props) {
    super(props)
    this.selectChoice = this.selectChoice.bind(this)
  }

  selectChoice () {
    if (this.props.isChoiceSelected) return;
    if (this.props.isCorrectChoice) this.props.incrementCorrect();
    this.props.selectChoice(this.props.choiceIndex);
  }

  render() {
    const choiceClass = classnames({
      choice: true,
      selected: this.props.selected,
      correct: this.props.isCorrectChoice,
      reveal: this.props.isChoiceSelected
    })

    return (
      <div
        className={choiceClass}
        onClick={this.selectChoice}>
        <div className="radio">
          <div className="inside">
          </div>
        </div>

        <div
          className="text"
          dangerouslySetInnerHTML={{__html: this.props.choice}}>
        </div>
      </div>
    );
  }
}

Choice.displayName = 'Choice';
Choice.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Choice);
