import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseLayout from "../components/layout/base";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home = () => {
  const [searchString, setSearchString] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch the processed string from the Flask backend
    const fetchProcessedString = async () => {
      try {
        const response = await fetch("/prot_folder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchString }),
        });

        const data = await response.json();
        console.log(data.summary);
        if (data.prot_folder !== "") {
          // Navigate to the "results" page with the input string
          navigate(`/results/${encodeURIComponent(searchString)}`);
        } else {
          // Navigate to the "results" page with the input string
          navigate(`/notfound`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProcessedString();
  };

  return (
    <>
      <BaseLayout>
        <div class="jumbotron bg-light-dark">
          <div class="container">
            <div class="row mt-6">
              <div class="col-md-12 text-center">
                <h1 class="display-4 text-light mt-5">
                  <strong>BENDER DB</strong>
                </h1>
                <p
                  className="display-7 text-light mt-3"
                  style={{ fontSize: "22px" }}
                >
                  a database of protein Binding sitEs across Neglected DiseasE pRoteomes
                </p>
                <div className="container p-0 mb-5 mt-5 justify-content-center">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                      <Paper
                        component="form"
                        sx={{
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          marginBottom: "10px",
                        }}
                        onSubmit={handleSubmit}
                      >
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                          disabled
                        >
                          <SearchIcon />
                        </IconButton>

                        <InputBase
                          onChange={(e) =>
                            setSearchString(e.target.value.toUpperCase())
                          }
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="Search for protein UniProt code"
                          inputProps={{ "aria-label": "search for protein" }}
                        />
                        <IconButton sx={{ p: "10px" }} aria-label="menu">
                          <Button variant="contained" onClick={handleSubmit}>
                            Search
                          </Button>
                        </IconButton>
                      </Paper>

                      <Paper
                        sx={{
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          backgroundColor: "inherit",
                        }}
                        elevation={0}
                      >
                        <Typography
                          variant="body"
                          sx={{ color: "white", mr: 1 }}
                        >
                          Examples:
                        </Typography>
                        <Button
                          variant="outlined"
                          component={Link}
                          to="/results/Q7Z1V1"
                          sx={{ color: "white", borderColor: "white", mr: 2 }}
                        >
                          Q7Z1V1
                        </Button>
                        <Button
                          variant="outlined"
                          component={Link}
                          to="/results/A4HXH5"
                          sx={{ color: "white", borderColor: "white", mr: 2 }}
                        >
                          A4HXH5
                        </Button>
                        <Button
                          variant="outlined"
                          component={Link}
                          to="/results/Q4E4E1"
                          sx={{ color: "white", borderColor: "white" }}
                        >
                          Q4E4E1
                        </Button>
                      </Paper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>

        <div class="container">
          <div class="row mt-4">
            <div
              class="col-md-6"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p>
                <h2>Binding sites in database</h2>
              </p>
              <p>
                BENDER DB is a comprehensive database containing protein binding
                sites for proteomes of neglected disease pathogens.
              </p>
              <p>
                Database includes 10 different proteomes, encompassing a total
                of 101,813 proteins and 1,172,743 binding sites.
              </p>
              <p>
                A complete list of all proteomes and available binding sites in
                BENDER DB can be found in the Available Data menu.
              </p>
            </div>
            <div class="col-md-6">
              <div class="bordered">
                <img
                  src="img/ngl2.png"
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "320px",
                    width: "auto",
                    height: "auto",
                  }}
                  alt="ngl"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="row mb">
            <div class="col-md-6">
              <div class="bordered">
                <img src="img/workflow.png" class=" img-fluid" />
              </div>
            </div>
            <div
              class="col-md-6"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p>
                <h2>Data collection and experiments</h2>
              </p>

              <p>
                Proteomes related to neglected disease pathogens, as listed by{" "}
                <a
                  className="text-decoration-none"
                  href="https://www.who.int/health-topics/neglected-tropical-diseases#tab=tab_1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WHO
                </a>{" "}
                and{" "}
                <a
                  className="text-decoration-none"
                  href="https://www.paho.org/en/topics/neglected-tropical-and-vector-borne-diseases"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PAHO
                </a>
                , were collected from the AlphaFold database.
              </p>
              <p>
                Five different predictors were used to identify pockets and
                binding sites in each protein.
              </p>

              <p>
                A web server was created to make the results accessible to the
                entire community.
              </p>
            </div>
          </div>
          <hr />
          <div class="row mt-1">
            <div
              class="col-md-6"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <br />
              <br />
              <h2 style={{ marginBottom: "25px" }}>Data visualization</h2>
              <p>
                BENDER DB utilizes two primary visual representations: NGL
                Viewer and UpSet Plot.
              </p>
              <p>
                NGL Viewer allows for the analysis of binding sites and residues
                identified by predictors within the protein structure itself.
              </p>
              <p>
                UpSet Plot enables verification of the convergence of results
                across all combinations of binding site predictions.
              </p>
            </div>
            <div class="col-md-6">
              <div class="bordered">
                <img
                  src="img/upset_example.png"
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    width: "auto",
                    height: "auto",
                  }}
                  alt="Example"
                />
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};
export default Home;
