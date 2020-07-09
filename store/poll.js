let poll;

const addPoll = ({ title, choices }) => {
  poll = {
    title,
    choices,
    votes: {},
  };
};

const getPoll = () => poll;

const clearPoll = () => {
  poll = undefined;
};

const vote = ({ id, choiceIdx }) => {
  poll.votes = {
    ...poll.votes,
    [id]: choiceIdx,
  };
};

module.exports = { addPoll, getPoll, clearPoll, vote };
