import React, { Component } from 'react';
import { Button } from 'reactstrap';
import questions from './React-Test/questions.json';
import ProgressBar from 'react-bootstrap/ProgressBar';

class App extends Component {
	state = {
		num: 0,
		selected: null,
		score: 0,
		maxScore: 100,
		totalRightAnswers: 0,
		temp: 0,
	};
	renderData = () => {
		const { selected, num, score, maxScore, totalRightAnswers, temp } = this.state;
		let options = questions[num].incorrect_answers
			.concat(questions[num].correct_answer)
			.sort();

		let Text,
			RightOrWrong = selected
				? selected === decodeURIComponent(questions[num].correct_answer)
				: null;
		if (RightOrWrong) {
			Text = <h2>Correct!</h2>;
		} else if (RightOrWrong === false) {
			Text = <h2>Sorry!</h2>;
		}

		return (
			<div
				style={{
					textAlign: 'justify',
				}}
			>
				<h1>{`Question ${num + 1} of 20`}</h1>
				<h4>{decodeURIComponent(questions[num].category)}</h4>
				<p>{decodeURIComponent(questions[num].question)}</p>

				{options.map((item, index) => (
					<Button
						style={{ width: '500px', margin: 5, flexWrap: 'wrap' }}
						size='lg'
						color='primary'
						onClick={event => {
							if (RightOrWrong === null) {
								this.setState({ selected: event.target.innerHTML });
								if (
									event.target.innerHTML === decodeURIComponent(questions[num].correct_answer)
								)
									this.setState({
										score: score + 5,
										totalRightAnswers: totalRightAnswers + 1,
									});
								else this.setState({ maxScore: maxScore - 5 });
								this.setState({ temp: temp + 1 });
							}
						}}
						active={selected === decodeURIComponent(item)}
					>
						{decodeURIComponent(item)}
					</Button>
				))}
				<div
					style={{
						textAlign: 'center',
					}}
				>
					{Text}
					{selected && (
						<Button
							color='success'
							size='lg'
							onClick={() => this.setState({ num: this.state.num + 1, selected: null })}
						>
							Next Question
						</Button>
					)}
				</div>
			</div>
		);
	};

	render() {
		const { num, score, maxScore, temp, totalRightAnswers } = this.state;
		let minScore = (totalRightAnswers / 20) * 100;
		let scorePercent = (totalRightAnswers / temp) * 100;
		const now = (this.state.num / questions.length) * 100;

		return (
			<div className='container'>
				<ProgressBar style={{ margin: 10 }} now={now} label={`${now}%`} />

				{num < questions.length ? (
					this.renderData()
				) : (
					<div
						style={{
							textAlign: 'center',
						}}
					>
						<h1>Quiz Completed!!!</h1>
						<h3>Your Score: {`${scorePercent}`}</h3>
						<Button
							color='warning'
							size='lg'
							onClick={() =>
								this.setState({
									num: 0,
									selected: null,
									score: 0,
									maxScore: 100,
									totalRightAnswers: 0,
									temp: 0,
								})
							}
						>
							Restart
						</Button>
					</div>
				)}
				<div
					style={{
						padding: '20px',
						position: 'fixed',
						left: '0',
						bottom: '10px',
						height: '100px',
						width: '100%',
					}}
				>
					<div>
						<h5 style={{ position: 'absolute', textAlign: 'left' }}>
							Score: {`${scorePercent || '0'}%`}
						</h5>
						<h5 style={{ textAlign: 'right' }}>Max Score: {`${maxScore}%`}</h5>
					</div>
					<ProgressBar
						variant='success'
						now={score}
						key={1}
						label={`Score: ${scorePercent}%`}
					/>
					<ProgressBar
						variant='warning'
						now={minScore}
						key={2}
						label={`Min Score: ${minScore}%`}
					/>
					<ProgressBar
						variant='danger'
						now={maxScore}
						key={3}
						label={`Max Score: ${maxScore}%`}
					/>
				</div>
			</div>
		);
	}
}

export default App;
