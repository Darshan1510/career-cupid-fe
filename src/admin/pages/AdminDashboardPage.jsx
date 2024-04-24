import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React from "react";
import JobPostingList from "../components/JobPostingList";
import RecruiterList from "../components/RecruiterList";
import SeekerList from "../components/SeekerList";

export default function AdminDashboardPage() {
  let [entity, setEntity] = React.useState("RECRUITER");

  return (
    <div className="App mt-2">
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => setEntity(e.target.value)}
          value={entity}
        >
          <FormControlLabel value="RECRUITER" control={<Radio />} label="Recruiter" />
          <FormControlLabel value="SEEKER" control={<Radio />} label="Seeker" />
          <FormControlLabel value="JOBPOSTING" control={<Radio />} label="Job Posting" />
        </RadioGroup>
      </FormControl>

      <div className="mt-2">{entity === "RECRUITER" && <RecruiterList />}</div>
      <div className="mt-2">
        {entity === "SEEKER" && (
          <div>
            <SeekerList />
          </div>
        )}
      </div>
      <div className="mt-2">
        {entity === "JOBPOSTING" && (
          <div>
            <JobPostingList />
          </div>
        )}
      </div>
    </div>
  );
}
