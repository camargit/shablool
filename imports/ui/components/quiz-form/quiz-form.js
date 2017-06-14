import React from 'react';
import QuestionForm from '../../components/question-form/question-form.js';
import Quiz from '../../../api/quizes/quizes.js';

// validations
const validateTitle = (title) => {
  let message;
  const quiz = new Quiz({ title });
  quiz.validate(
    {
      fields: ['title'],
    },
    err => (message = err && err.reason),
  );
  return message;
};

const QuizForm = ({ quiz, validate, actions }) => {
  const titleValidation = validate && validateTitle(quiz.title);
  return (
    <div id="create-quiz">
      <div className="row">
        <div className="col-sm-12">
          <div className="page-header">
            <div className={`form-group ${titleValidation ? 'has-error' : ''}`}>
              <input
                name="title"
                className="input-title form-control"
                placeholder="כותרת שאלון"
                value={quiz.title}
                onChange={actions.changeQuizTitle}
              />
              {titleValidation
                ? <label className="control-label" htmlFor="title">{titleValidation}</label>
                : ''}
            </div>
          </div>
        </div>
      </div>
      {quiz.questions.map(q => (
        <div key={q._id} className="row">
          <div className="col-sm-12">
            <QuestionForm question={q} validate={validate} actions={actions} />
          </div>
        </div>
      ))}
      <div className="row">
        <div className="col-sm-12">
          <button className="btn btn-primary btn-lg btn-block" onClick={actions.addQuestion}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-9">
          <div className="row">
            <div className="col-lg-4">
              <form onSubmit={actions.addTag}>
                <label htmlFor="tag" className="control-label">
                  הוספת תגיות
                </label>
                <input name="tag" className="form-control input-lg" />
              </form>
            </div>
            <div className="col-lg-8">
              {quiz.tags.map(t => <TagTemplate key={t._id} tag={t} actions={actions} />)}
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="form-group-lg">
            <label htmlFor="isPrivate" className="control-label">
              מי יכול למצוא את השאלון
            </label>
            <select name="isPrivate" className="is-private form-control">
              <option value="false">כולם</option>
              <option value="true">רק אני</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-12">
          <button className="btn btn-success btn-lg col-sm-2 pull-left" onClick={actions.saveQuiz}>
            <span className="glyphicon glyphicon-ok" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TagTemplate = ({ tag, actions }) => (
  <h2 className="pull-right">
    <span className="label label-info">
      {tag.name}
      <span
        className="glyphicon glyphicon-remove clickable"
        aria-hidden="true"
        onClick={actions.removeTag(tag._id)}
      />
    </span>
  </h2>
);

export default QuizForm;