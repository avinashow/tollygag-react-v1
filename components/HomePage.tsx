import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

import { GetPostTO } from '../api/api.types';
import { getPosts } from '../api/get-posts.api';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { GagCard } from './GagCard';

type HomeProps = any;


const Home = (props: HomeProps) => {
  const { history } = props;
  const [posts, setPosts] = useState< GetPostTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);

    getPosts().then(data => {
      setPosts(data.items);
    }).catch(error => {
      //TODO error handling
    }).finally(() => {
      setLoading(false);
    })
  },[]);

  function viewGag(gagId) {
    console.log(gagId);
    history.push(`/gag/${gagId}`);
  }

  if (loading || !posts) {
    return (
      <CircularProgress />
    );
  }

  return (
    <div>
      {posts.map((post, index) => (
        <GagCard key={index} post={post} handleOnClick={viewGag} />
      ))}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
    '&:hover' : {
      cursor: 'pointer'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const HomeWithRouter = withRouter(Home);