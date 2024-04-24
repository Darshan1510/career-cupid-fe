import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  ClickAwayListener,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import * as levelsFyiClient from "../../externalApis/levelsFyiClient";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "0.3rem",
  backgroundColor: alpha(theme.palette.common.black, 0.1),

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
  borderRadius: "1rem",
}));

const StyledRoot = styled("div")({
  width: "100%",
  "& input": {
    border: 0,
    outline: "none",
    height: "25px",
  },
  "& #results": {
    position: "absolute",
    zIndex: 10000,
    marginTop: "15px", // Adjust margin-top to leave some space for the header
    background: "white",
    boxShadow: "0 0 5px gray",
    borderRadius: "5px",
    maxHeight: "350px", // Limit the maximum height of the suggestions list
    overflowY: "auto", // Add vertical scroll when the suggestions exceed the maxHeight
  },
  "& form": {
    borderRadius: "50px",
  },
});

export default function SearchBox() {
  const params = new URLSearchParams(window.location.search);
  let [keyword, setKeyword] = React.useState(params.get("keyword"));
  let type = params.get("type") || "ALL";
  let [searchAnchor, setSearchAnchor] = React.useState(null);
  let [suggestions, setSuggestions] = React.useState({});

  const onSearch = (e) => {
    e.preventDefault();
    if (!keyword || keyword.trim() === "") {
      return;
    }
    keyword = keyword.trim();
    keyword = encodeURIComponent(keyword);
    window.location.href = `/search?keyword=${keyword}&type=${type}`;
  };

  const autoComplete = async (k) => {
    setKeyword(k);
    if (k) {
      let ajaxes = [levelsFyiClient.getCompanySearches(k), levelsFyiClient.getJobSearches(k)];

      let data = await Promise.allSettled(ajaxes);

      data = data.map((d) => d.value);
      let [companySearches, jobSearches] = data;
      jobSearches = jobSearches.results;
      suggestions = {
        companySearches: companySearches,
        jobSearches: jobSearches,
      };
      setSuggestions(suggestions);
    }
  };

  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={() => setSearchAnchor(null)}>
        <StyledRoot>
          <form onSubmit={onSearch}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search (Leves.fyi company)"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => autoComplete(e.target.value)}
                value={keyword || ""}
                style={{ display: "contents" }}
                onFocus={(e) => setSearchAnchor(e.target)}
              />
            </Search>
            {searchAnchor && !!keyword && (
              <div id="results" className="p-3 w-50">
                {Object.keys(suggestions).includes("companySearches") &&
                  suggestions.companySearches.length > 0 && (
                    <React.Fragment>
                      <h6 className="text-secondary text-left">Companies</h6>
                      <List>
                        {suggestions.companySearches.slice(4).map((s, idx) => (
                          <ListItem
                            onClick={() => setSearchAnchor(null)}
                            key={idx}
                            target="_blank"
                            component="a"
                            href={`https://www.levels.fyi/company/${s.slug}`}
                          >
                            <ListItemAvatar>
                              <Avatar alt={s.displayValue} src={s.icon} />
                            </ListItemAvatar>
                            <ListItemText sx={{ color: "black" }} primary={s.displayValue} />
                          </ListItem>
                        ))}
                      </List>
                    </React.Fragment>
                  )}
                {Object.keys(suggestions).includes("jobSearches") &&
                  suggestions.jobSearches.length > 0 && (
                    <React.Fragment>
                      <h6 className="text-secondary text-left">Companies & Jobs</h6>
                      <List>
                        {suggestions.jobSearches.map((company, idx) => (
                          <React.Fragment key={idx}>
                            <ListItem
                              onClick={() => setSearchAnchor(null)}
                              target="_blank"
                              component="a"
                              href={`https://www.levels.fyi/company/${company.companySlug}`}
                            >
                              <ListItemAvatar>
                                <Avatar alt={company.companyName} src={company.companyIcon} />
                              </ListItemAvatar>
                              <ListItemText
                                sx={{ color: "black" }}
                                primary={company.companyName}
                                secondary={company.shortDescription}
                              />
                            </ListItem>
                            {company.jobs && company.jobs.length > 0 && (
                              <List>
                                {company.jobs.map((job, jobIdx) => (
                                  <ListItem
                                    onClick={() => setSearchAnchor(null)}
                                    key={jobIdx}
                                    target="_blank"
                                    component="a"
                                    href={job.applicationUrl}
                                  >
                                    <ListItemAvatar>
                                      <Avatar alt={job.title} src={company.companyIcon} />
                                    </ListItemAvatar>
                                    <ListItemText
                                      sx={{ color: "black" }}
                                      primary={job.title}
                                      secondary={`${job.locations.join(", ")}`}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    </React.Fragment>
                  )}
              </div>
            )}
          </form>
        </StyledRoot>
      </ClickAwayListener>
    </React.Fragment>
  );
}
