import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Game from '/imports/api/games/games';
import GameManager from '../game-manager/game-manager';
import GamePlayer from '../game-player/game-player';
import Loading from '../../components/loading';

const GameRouter = ({ game }) => {
  const isManager = game.quiz.owner === Meteor.userId();
  return isManager ? <GameManager game={game} /> : <GamePlayer game={game} />;
};

GameRouter.propTypes = {
  game: PropTypes.instanceOf(Object).isRequired,
};

const GameRouterContainer = ({ loading, game }) => {
  if (loading) return <Loading color={'white'} />;
  return <GameRouter game={game} />;
};

GameRouterContainer.propTypes = {
  game: PropTypes.instanceOf(Object),
  loading: PropTypes.bool.isRequired,
};

GameRouterContainer.defaultProps = {
  game: undefined,
};

export default createContainer(({ code }) => {
  const imagesHandle = Meteor.subscribe('images.all');
  const usersHandle = Meteor.subscribe('users.name.by-game', code);
  const gameHandle = Meteor.subscribe('games.get-by-code', code);
  const loading = !imagesHandle.ready() || !gameHandle.ready() || !usersHandle.ready();
  const game = Game.findOne();
  return { loading, game };
}, GameRouterContainer);
