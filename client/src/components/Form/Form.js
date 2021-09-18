import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, FormControlLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// import FileBase from 'react-file-base64';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const today = new Date()
  const [postData, setPostData] = useState({ creator: '', title: '', description: '', expenseType: '', amount: '0', date: today.toISOString().split('T')[0], selectedFile: '' });
  
  // setting the default value of the radio button to Grocery
  const [type, setType] = useState('Grocery')

  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', description: '', expenseType: '', amount: '0', date: today.toISOString().split('T')[0], selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit postdata',postData)
    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  const handleType = (e) => {
    setType(e.target.value)
    setPostData({ ...postData, expenseType: e.target.value })
    console.log('type', type)
    console.log('postData', postData)
    console.log('value', e.target.value)
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating an Expense'}</Typography>
        <TextField 
          name="creator" 
          variant="outlined"
          label="Creator" 
          fullWidth 
          value={postData.creator} 
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })} 
        />
        <TextField 
          name="title" 
          variant="outlined" 
          label="Title" 
          fullWidth 
          value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField 
          name="description" 
          variant="outlined" 
          label="Description" 
          fullWidth 
          multiline 
          rows={4} 
          value={postData.description} 
          onChange={(e) => setPostData({ ...postData, description: e.target.value })} 
        />
        <TextField 
          name="amount" 
          variant="outlined" 
          label="Amount ($)" 
          fullWidth 
          value={postData.amount} 
          onChange={(e) => setPostData({ ...postData, amount: e.target.value })} 
        />
        <TextField 
          name="date" 
          variant="outlined" 
          label="Date (YYYY-MM-DD)" 
          fullWidth 
          value={postData.date} 
          onChange={(e) => setPostData({ ...postData, date: e.target.value })} 
        />
        <FormControl className={classes.paper}>
          <FormLabel>Expense Type</FormLabel>
          <RadioGroup value={type} onChange={handleType}>
            <FormControlLabel value='Grocery' control={<Radio />} label='Grocery' />
            <FormControlLabel value='Utilities' control={<Radio />} label='Utilities' />
            <FormControlLabel value='Bank' control={<Radio />} label='Bank' />
            <FormControlLabel value='Credit Card' control={<Radio />} label='Credit Card' />
            <FormControlLabel value='Other' control={<Radio />} label='Other' />
          </RadioGroup>
        </FormControl>
        {/* <div className={classes.fileInput}>
          <FileBase 
            type="file" 
            multiple={false} 
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div> */}
        <Button 
          className={classes.buttonSubmit} 
          variant="contained" 
          color="primary" 
          size="large" 
          type="submit" 
          fullWidth
        >Submit</Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          onClick={clear} 
          fullWidth
        >Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
