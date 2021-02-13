document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  /**
   * final solution is
   * id er sathe je string ke jog kora hoycecilo take delete kore dewa hoyece
   * karon parameter id o obj id er type ek cilo na tai code kaj kore nai...
   * == use korle kaj korto
   * parameter id ke .toString() kore dile kaj korto
   * ar delete korar somoy fetchIssues() ke call kora hoyce ce
   * 100% done;
   */
  if (
    typeof description === "string" &&
    description !== "" &&
    description !== " "
  ) {
    const id = Math.floor(Math.random() * 100000000);
    const status = "Open";
    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem("issues")) {
      issues = JSON.parse(localStorage.getItem("issues"));
    }
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
    document.getElementById("issueInputForm").reset();
    fetchIssues();
  } else {
    alert("Please type something");
  }

  e.preventDefault();
}

const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  /**
   * close issue fixed
   * issue.id type is string
   * id type is number
   * find use ===
   * so result is obesely false
   * solution convert id type string or use ==
   */
  const currentIssue = issues.find((issue) => issue.id === id);
  console.log(currentIssue);
  currentIssue.status = "Closed";
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  /**
   * fetchIssues function ke call kora hoyce
   * parameter id toString kora hoyece;
   */
  const remainingIssues = issues.filter((issue) => issue.id !== id);
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";
  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    issuesList.innerHTML += `<div class="well" idColor=${id}>
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                             <h3 class="issue_${status.toLowerCase()}">${description}</h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  /***********
   * issue count shower
   */
  issuesCountShower(issues)
   //total issues
  //  document.getElementById("totalIssueCounter").innerText = issues.length;
  //  //open issues
  //  const openIssues = issues.filter((issue) => issue.status !== "Closed");
  //  document.getElementById("openIssueCounter").innerText = openIssues.length;
  //  //closed issues
  //  const closedIssues = issues.filter((issue) => issue.status === "Closed");
  //  document.getElementById("closedIssueCounter").innerText = closedIssues.length;
};

function issuesCountShower(issues) {
  //total issues
  document.getElementById("totalIssueCounter").innerText = issues.length;
  //open issues
  const openIssues = issues.filter((issue) => issue.status !== "Closed");
  document.getElementById("openIssueCounter").innerText = openIssues.length;
  //closed issues
  const closedIssues = issues.filter((issue) => issue.status === "Closed");
  document.getElementById("closedIssueCounter").innerText = closedIssues.length;
}