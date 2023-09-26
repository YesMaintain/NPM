import Environment from "../Library/Environment.js";
import Request from "../Library/Request.js";
var Dispatch_default = async (repositories = []) => {
  const User = Environment.User;
  const Organizations = [];
  const Repositories = [];
  for (const repo of (await Request(`GET /users/${User}/repos`))?.data) {
    Repositories.push({
      owner: User,
      name: repo.name
    });
  }
  for (const org of (await Request(`GET /users/${User}/orgs`))?.data) {
    Organizations.push({
      name: org.login
    });
    for (const repo of (await Request(`GET /orgs/${org.login}/repos`))?.data) {
      Repositories.push({
        owner: org.login,
        name: repo.name
      });
    }
  }
  let pass = void 0;
  for (const repo of Repositories) {
    for (const repository of repositories) {
      if (repo.name === repository) {
        pass = true;
      } else {
        pass = false;
      }
    }
    if (typeof pass === "undefined" || pass) {
      for (const workflow of (await Request(
        `GET /repos/${repo.owner}/${repo.name}/actions/workflows`,
        { owner: repo.owner, repo: repo.name }
      ))?.data?.workflows) {
        await Request(
          `POST /repos/${repo.owner}/${repo.name}/actions/workflows/${workflow.id}/dispatches`,
          {
            ref: "main"
          }
        );
      }
    }
  }
};
export {
  Dispatch_default as default
};
