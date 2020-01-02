import merge from 'lodash/merge';

export const entities = (
  state = {
    events: {},
    orgs: {},
    repos: {},
    issues: {},
    issueTimelineItems: {},
    users: {},
    gqlRepos: {},
  },
  action
) => {
  if (action && action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
};
