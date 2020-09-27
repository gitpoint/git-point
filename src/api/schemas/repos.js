import { schema } from 'normalizr';
import { languageColors } from 'config';

const minV3 = repo => ({
  id: repo.id,
  name: repo.name.split('/')[0],
  nameWithOwner: repo.name,
  // TODO: Remove me once the transition is done
  '----------------': '-------------------',
  full_name: repo.name,
  url: `https://api.github.com/repos/${repo.name}`,
});

const fullV3 = repo => {
  return {
    id: repo.id,
    name: repo.name,
    nameWithOwner: repo.full_name,
    isFork: repo.fork,
    description: repo.description,
    forkCount: repo.forks_count,
    isPrivate: repo.private,
    primaryLanguage: repo.language
      ? {
          name: repo.language,
          color: languageColors[repo.language],
        }
      : null,
    stargazers: {
      totalCount: repo.stargazers_count,
    },
    defaultBranchRef: {
      name: repo.default_branch,
    },
    // TODO: Remove me once the transition is done
    '----------------': '-------------------',
    full_name: repo.full_name,
    fork: repo.fork,
    private: repo.private,
    forks_count: repo.forks_count,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    url: `https://api.github.com/repos/${repo.full_name}`,
  };
};

export const repoSchema = new schema.Entity(
  'repos',
  {},
  {
    idAttribute: repo => (repo.full_name ? repo.full_name : repo.name),
    processStrategy: repo => {
      if (repo.full_name) {
        // full v3
        return fullV3(repo);
      }

      return minV3(repo);
    },
  }
);
