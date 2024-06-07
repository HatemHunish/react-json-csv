import "./App.css";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import QueryInput from "./components/QueryInput";
import ResultsTable from "./components/ResultsTable";
import { useState } from "react";
const readJsonFile = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      if (event.target) {
        resolve(JSON.parse(event.target.result));
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // Implement your upload logic here
    if (selectedFile) {
      // Example: You can use FormData to send the file to a server
      const parsedData = await readJsonFile(selectedFile);

      setData(parsedData);
      setDataReady(true);
    } else {
      console.warn("No file selected for upload");
    }
  };
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                PROD Query Runner
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Typography variant="h4" component="h1" gutterBottom></Typography>
      </Box>
      <Container>
        <QueryInput
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          selectedFile={selectedFile}
        />
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
          }}>
          <ResultsTable data={data} dataReady={dataReady} />
        </Box>
      </Container>
    </>
  );
}

export default App;
