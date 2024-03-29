/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro';
import Checkbox from 'components/Checkbox'
import { API_URL } from 'utils/urls';
import stories from 'reducers/stories';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const FictionArray = [
  { value: 'fantasy', title: 'Fantasy' },
  { value: 'adventure', title: 'Adventure' },
  { value: 'mystery', title: 'Mystery' },
  { value: 'historical', title: 'Historical' }
];
export const NonFictionArray = [
  { value: 'history', title: 'History ' },
  { value: 'art', title: 'Art' },
  { value: 'travel', title: 'Travel' },
  { value: 'nature', title: 'Nature' }
];

export const CreateStoryForm = () => {
  const [tags, setTags] = useState({});
  const [storyName, setStoryName] = useState();
  const [storyImg, setStoryImg] = useState();
  const [storyContent, setStoryContent] = useState();
  // const dispatch = useDispatch;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    console.log('createstoryform useeffect')
    if (accessToken) {
      console.log('login accesstoken ok')
      // navigate('/')
    } else {
      console.log('login no token')
    }
  }, [accessToken, navigate]);

  const convertTagsToArray = (tagsObject) => {
    const tagsArray = [];
    Object.keys(tagsObject).forEach((key) => {
      if (tagsObject[key] === true) {
        tagsArray.push(key);
      }
    })
    return tagsArray;
  }
  // Submit new story
  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log('CreateStory onSubmit')
    const options = {
      method: 'POST',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        story: {
          name: storyName,
          storyImg,
          storyContent,
          tags: convertTagsToArray
        }
      })
    }
    fetch(API_URL('stories'), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(stories.actions.setNewStory(data.response))
      })
    navigate('/MyStory')
  }
  const handleStoryName = (event) => {
    setStoryName(event.target.value)
  };
  const handleStoryImg = (event) => {
    setStoryImg(event.target.value)
  };
  const handleStoryContent = (event) => {
    setStoryContent(event.target.value)
  };

  const handleOnChange = (event) => {
    const key = event.target.name;
    const currentValue = tags[key];
    setTags(() => ({
      ...tags,
      [key]: !currentValue
    }));
  }
  // if (!accessToken) {
  //   return (
  //     <div>
  //       <p>Please login first.</p>
  //     </div>
  //   );
  // }
  return (
    <OutterWrapper>
      <FormWrapper>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="title" className="label">Story Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter your story tile"
            value={storyName}
            onChange={handleStoryName} />

          <label htmlFor="image" className="label">Story Image</label>
          <input
            type="url"
            id="image"
            placeholder="copy image address"
            value={storyImg}
            onChange={handleStoryImg} />

          <label htmlFor="content" className="label">Story Content</label>
          <textarea
            type="text"
            id="content"
            rows="8"
            cols="33"
            placeholder="Start your story here..."
            value={storyContent}
            onChange={handleStoryContent} />
          <CheckBoxWrapper>
            <p>Fiction</p>
            {FictionArray.map(({ title, value }) => <Checkbox key={value} title={title} value={value} handleOnChange={handleOnChange} tags={tags} />)}
            <p>NonFiction</p>
            {NonFictionArray.map(({ title, value }) => <Checkbox key={value} title={title} value={value} handleOnChange={handleOnChange} tags={tags} />)}
          </CheckBoxWrapper>
          <button type="submit">Submit Story</button>
        </form>
      </FormWrapper>
    </OutterWrapper>
  )
}

const OutterWrapper = styled.div`
  padding: 2%;
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  text-align: center;

`
const CheckBoxWrapper = styled.div`

    p {
      font-size: 22px;
      color: #0D2464;
      margin: 10px;
    } 
    label {
      color: #6874A3;
      font-size: 18px;
      font-weight: 500;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    } 
 
`
const FormWrapper = styled.div`
   
    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 30vw;
      height: auto;
    }
    input {  
      /* display: flex;
      padding: 10px;
      border: none;
      border-radius: 5px;
      width: 300px;
      cursor: pointer;
      background-color: #F3F3FB; */
    }
    #label {
      margin: 10px;
      padding-top: 5px;
      color: #0D2464;
      font-size: 24px;
      font-weight: 500;
      font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    textarea {
      resize: none;
      width: 350px;
      height: 200px;
      border: none;
      /* border: grey solid 1px; */
      border-radius: 5px;
      font-family: Arial, sans-serif;
      overflow: scroll;
      background-color: #F3F3FB;
    }  
    button {
      background-color: #0D2464;
      border: none;
      border-radius: 20px;
      color: white;
      padding: 10px 30px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      margin-top: 20px;
      cursor: pointer;
    }  

`