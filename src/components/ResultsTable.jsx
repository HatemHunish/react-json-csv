import  "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.css";
import { ReactTabulator } from 'react-tabulator'
import { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";


function ResultsTable({data,dataReady}) {
    const [columns, setColumns] = useState([]);
    const [values, seValues] = useState([]);
    const [loader, setLoader] = useState(false);
    const table = useRef(null)

    const getData=async()=>{
    let col=Object.keys(data[0]);
    let cols=[]
    console.log(col)
    col.forEach(c=>{
    cols.push({
        title:c,
        field:c
    })

    })
    setColumns([...cols])
  
    }  
useEffect(() => {
   
     


  return () => {
    table.current?.destroy()
  }
}, [data])

    const getValues=async()=>{
       setLoader(true)
        getData()
        let values=Object.values(data);
        seValues([...values])
        }  
    const title = new Date().toISOString();
    const download=async()=>{
        console.log(table.current)
       table.current.download("xlsx", `${title}.xlsx`);
     
      
        }  
    
  return (
    <Box  display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center" mx={4} height='100vh'>
 
   {!loader?<>
   <Box display="flex"
   columnGap={2}
    flexDirection="row"
    justifyContent="center"
    alignItems="center" >
   <Button  variant="contained" onClick={getValues} disabled={!dataReady}>Fill</Button>
   <Button  variant="contained" onClick={download}>Download</Button>
   </Box>
  
   </>:
   <Box >
    <CircularProgress />
   </Box>
   }
   <ReactTabulator
    options={{
        responsiveLayout:true,
        renderHorizontal:"virtual",
        frozenColumns:2, 
        resizableColumnFit:true,
        layoutColumnsOnNewData:true,
    }}
    onRef={(ref)=>table.current=ref?.current}
    data={values}
    
    columns={columns}
    layout={"fitDataTable"}
    events={{
        dataLoaded: ()=>{
            setLoader(false)
        },
        dataLoading: ()=>{
            setLoader(true)
        },
      }}
    />
   
    </Box>
  );
}

export default ResultsTable