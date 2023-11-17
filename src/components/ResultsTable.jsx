import  "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.css";
import { ReactTabulator } from 'react-tabulator'
import { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, setRef } from "@mui/material";

import {ExportModule} from 'tabulator-tables';

// const columns = [
//     { title: "Name", field: "name", width: 150 },
//     { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
//     { title: "Favourite Color", field: "col" },
//     { title: "Date Of Birth", field: "dob", hozAlign: "center" },
//     { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
//     { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
//   ];
//   var data = [
//     {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
//     {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
//     {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
//     {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
//     {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
//   ]; 
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
    const download=async()=>{
        console.log(table.current)
       table.current.download("xlsx", "data.xlsx");
     
      
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