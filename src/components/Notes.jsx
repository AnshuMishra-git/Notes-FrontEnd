import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button, Modal, Box, Container, Stack, Paper, TextField } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from '../redux/Notes/notes.actions'
import fetchApi from '../reuseble/fetchApi';
import Contant from '../reuseble/Constant';

function Notes() {
    const dispatch = useDispatch();
    const Login = useSelector((state) => state.notes);
    const [note, setnote] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [body, setbody] = useState('')
    const [title, settitle] = useState('')

    useEffect(() => {
        getNotes();
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const getNotes = async () => {
        let obj = {
            page: 0,
            userId: localStorage.getItem('id')
        }
        const response = await fetchApi({
            method: 'post',
            reqUrl: Contant.MYNOTES,
            data: obj,
        });
        await setnote(response.data.data.data)
    }


    const AddNotes = async () => {

        let obj = {
            title: title,
            body: body,
            userId: localStorage.getItem('id')

        }

        const response = await fetchApi({
            method: 'post',
            reqUrl: Contant.NOTE_CREATE,
            data: obj,
        });
        if(response.data.code ==200){
            getNotes()
            handleClose()
            settitle('')
            setbody('')
        }
    }


    return (
        <Container>
            <Button onClick={handleOpen} style={{ float: 'right', marginTop: '10px' }}>Create Note modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack>

                <Box sx={style}>
                    <TextField id="standard-basic" required label="Title" variant="standard" value={title} onChange={(e) => settitle(e.target.value)} />
                    <TextField id="standard-basic" required label="Body" variant="standard" value={body} onChange={(e) => setbody(e.target.value)} />
                    <br></br>
                    <Button style={{ marginTop: '10px', padding : '5px' }} variant="contained" disabled={!body} onClick={() => AddNotes()}>Add Notes</Button>
                </Box>
                </Stack>
            </Modal>
            <Container style={{ float: 'right', marginTop: '10px' }}>
                {
                    note && note.map((data, i) => (
                        <Paper variant="outlined" square key={i} >
                            <Card sx={{ minWidth: 275 }} sx={{ margin: '10px', padding: '2px' }}>
                                <CardContent >
                                    <Stack key={i}>
                                        <Typography sx={{ fontSize: 20 }} color="text.danger" gutterBottom>
                                            {data.title}
                                        </Typography>
                                        <Typography sx={{ mb: 2.5 }} color="text.secondary">
                                            {data.body}
                                        </Typography>

                                    </Stack>
                                </CardContent>
                            </Card>
                        </Paper>
                    ))
                }

            </Container>
        </Container>
    )
}

export default Notes


 // <Card sx={{ minWidth: 275 }}>
                //     {
            //         note ? note.map((data, i) => {
            //             <h1>{i}</h1>
            //             // <CardContent key={i}>
                    //             //     {data.body}
            //             //     <Typography sx={{ fontSize: 20 }} color="text.danger" gutterBottom>
                        //             //         df
            //             //     </Typography>
            //             //     <Typography sx={{ mb: 2.5 }} color="text.secondary">
                        //             //         {i + 1}
            //             //     </Typography>
            //             // </CardContent>
            //         })
            //             : null
            //     }
            // </Card>