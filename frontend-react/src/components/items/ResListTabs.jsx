import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import IconButton from "@mui/material/IconButton";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ResListTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {props.bindSites.map((site, i) => (
            <Tab label={`Site ${i}`} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>

      {props.bindSites.map((p, i) => (
        <CustomTabPanel value={value} index={i} sx={{ backgroundColor: "red" }}>
          <div
            className="table-container"
            style={{
              maxHeight: "620px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="table">
              <table className="table table-sm table-hover">
                <thead
                  className="bg-light"
                  style={{
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <tr>
                    <th className="text-center">Residue</th>
                    <th className="text-center">Number</th>
                    <th className="text-center">Chain</th>
                    <th className="text-center">Look at</th>
                  </tr>
                </thead>
                <tbody>
                  {p.map((res, j) => (
                    <tr key={j}>
                      <td className="text-center p-2">{res[1]}</td>
                      <td className="text-center p-2">{res[2]}</td>
                      <td className="text-center p-2">{res[0]}</td>
                      <td className="text-center">
                        <IconButton
                          className="p-1"
                          aria-label="focus-res"
                          title="Focus on this residue"
                          //onClick={() =>
                          //focusResidue(stage, res[2], res[0])
                          //}
                        >
                          <RemoveRedEyeOutlinedIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CustomTabPanel>
      ))}
    </Box>
  );
}
