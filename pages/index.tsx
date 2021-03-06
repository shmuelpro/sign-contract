import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Container, Typography, FormControl, InputLabel, Input, FormHelperText, AppBar, Toolbar, IconButton, TextField } from '@mui/material';
import { Menu, Add } from '@mui/icons-material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Modal from '@mui/material/Modal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState, useRef } from 'react';
import SignaturePad from 'signature_pad';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,


};


const styleX = {

  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};



const Home: NextPage = () => {


  const [seifim, setSeifim] = useState([{ id: "asd", title: "הקדמה", body: "המבוא להסכם זה מהווה חלק בלתי נפרד ממנו ותנאי מתנאיו." }]);
  const [open, setOpen] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [signatureImage, setSignatureImage] = useState<string>();
  const [sigHolder, setSigHolder] = useState<SignaturePad>();

  const [seifBody, setSeifBody] = useState<string>("");
  const [seifTitle, setSeifTitle] = useState<string>("");

  const [seller,setSeller] = useState<string>("");
  const [buyer,setBuyer] = useState<string>("");


  const TOPDF = async () => {
    const html2pdf = await import('html2pdf.js')
    console.log(html2pdf)
    html2pdf.default().from(ref.current).save();
  }

  const ref = useRef<HTMLDivElement>(null);
  const refSig = React.useCallback(node => {
    if (node) {
      var signaturePad = new SignaturePad(node);
      setSigHolder(signaturePad)

    }

  }, [])




  const startSig = () => {
    setOpenSignature(true);
  }

  return (
    <Container >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button
              color="inherit"
              onClick={handleOpen}
            >
              הוסף סעיף
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

            </Typography>
            <Button color="inherit" onClick={startSig}>חתום</Button>
            <Button color="inherit" onClick={TOPDF}> המר ל PDF</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ my: 4, p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <div><FormControl>
            <InputLabel style={{ right: 0 }} htmlFor="my-input">המוכר</InputLabel>
            <Input value={seller} onChange={(event)=>setSeller(event.target.value)}  id="my-input" aria-describedby="my-helper-text" />

          </FormControl>
          </div>
          <div style={{marginTop:"20px"}}><FormControl>
            <InputLabel style={{ right: 0 }} htmlFor="my-input">הקונה</InputLabel>
            <Input value={buyer} onChange={(event)=>setBuyer(event.target.value)} id="my-input" aria-describedby="my-helper-text" />

          </FormControl>   </div>
        </Typography>


      </Box>
      <div>
        {

          seifim.map((item, index) => {
            return (<Accordion key={item.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {item.body}
                </Typography>
                <Button onClick={() => {
                  setSeifim((oldSeifim) => {

                    const tempS = [...oldSeifim]
                    tempS.splice(index, 1)
                    console.log(oldSeifim)
                    return tempS;
                  });

                }}           >
                  מחק
                </Button>
              </AccordionDetails>
            </Accordion>)

          })
        }



      </div>
     
     <div>תוצאה</div>
      <div   ref={ref}>
        <div style={{
          display: "flex", justifyContent: "center", marginBottom: "50px",flexDirection:"column",fontWeight:700
        }}>
          <div style={{marginBottom:"10px", display: "flex", justifyContent: "center",flexDirection:"column",textAlign:"center"}}>
          <div>בין </div>
          <div>{seller} </div>
          </div>
          <div style={{marginBottom:"10px", display: "flex", justifyContent: "center",flexDirection:"column",textAlign:"center"}}>
          <div>לבין</div>
          <div>{buyer}</div>
          </div>
        </div>
        <div style={{ padding: "50px" }}>{seifim.map((seif, index) => {

          console.log(seif)

          return (<div key={seif.id}>
            {index + 1}. {seif.body}
          </div>)
        })}
        </div>
        <img src={signatureImage} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField dir="rtl" id="standard-basic" label="כותרת" variant="standard"

              onChange={(event) => setSeifTitle(event.target.value)}
              value={seifTitle}
            />

          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, width: "100%" }}>
            <TextField
              style={{width:"100%"}}
              dir="rtl"
              id="outlined-multiline-static"
              label="סעיף"
              multiline
              rows={4}
              onChange={(event) => setSeifBody(event.target.value)}
              value={seifBody}
            />
          </Typography>
          <Button onClick={() => {
            setSeifim(oldSeifim => {

              oldSeifim.push({ id: uuid(), title: seifTitle, body: seifBody })
              return oldSeifim;

            });
            handleClose();
          }}   >
            הוסף
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openSignature}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleX}>
          <canvas width="360" height="240" ref={refSig}>
          </canvas>
          <div style={{ background: "#f6f6f6" }}> <Button onClick={() => {

            if (sigHolder) {
              setSignatureImage(sigHolder.toDataURL())
              setOpenSignature(false)
            }

          }}        >
            הוסף
          </Button>
          </div>
        </Box>
      </Modal>
    </Container >
  )
}

export default Home
