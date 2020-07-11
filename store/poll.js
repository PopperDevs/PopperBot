let poll;

function addPoll({ title, choices }) {
  poll = {
    title,
    choices,
    votes: {},
  };
}

function getPoll() {
  return poll;
}

function clearPoll() {
  poll = undefined;
}

function vote({ id, choiceIdx }) {
  poll.votes = {
    ...poll.votes,
    [id]: choiceIdx,
  };
}

module.exports = { addPoll, getPoll, clearPoll, vote };
