import React from 'react'
import { useStateContext } from '../contexts/StateContext'
import LeftSidebar from './LeftSidebar'
import Post from './Post'
const posts = [
    {
        photoURL: 'https://avatars.githubusercontent.com/u/88154142?v=4',
        name: 'Gaurav',
        postPic: 'https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg?w=2000',
        likes: 0,
        comments: [
            {
                id: 1,
                name: 'John Smith',
                comment: 'Nice post',
                timestamp: new Date()
            }
        ],
        title: "hi see my this post",
        views: 120
    },  {
        photoURL: 'https://avatars.githubusercontent.com/u/88154142?v=4',
        name: 'Gaurav',
        postPic: 'https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg?w=2000',
        likes: 0,
        comments: [
            {
                id: 1,
                name: 'John Smith',
                comment: 'Nice post',
                timestamp: new Date()
            }
        ],
        title: "hi see my this post",
        views: 120
    },  {
        photoURL: 'https://avatars.githubusercontent.com/u/88154142?v=4',
        name: 'Gaurav',
        postPic: 'https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg?w=2000',
        likes: 0,
        comments: [
            {
                id: 1,
                name: 'John Smith',
                comment: 'Nice post',
                timestamp: new Date()
            }
        ],
        title: "hi see my this post",
        views: 120
    },  {
        photoURL: 'https://avatars.githubusercontent.com/u/88154142?v=4',
        name: 'Gaurav',
        postPic: 'https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg?w=2000',
        likes: 0,
        comments: [
            {
                id: 1,
                name: 'John Smith',
                comment: 'Nice post',
                timestamp: new Date()
            }
        ],
        title: "hi see my this post",
        views: 120
    },  {
        photoURL: 'https://avatars.githubusercontent.com/u/88154142?v=4',
        name: 'Gaurav',
        postPic: 'https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg?w=2000',
        likes: 0,
        comments: [
            {
                id: 1,
                name: 'John Smith',
                comment: 'Nice post',
                timestamp: new Date()
            }
        ],
        title: "hi see my this post",
        views: 120
    },
]
const HomePage = () => {
    const {darkMode} = useStateContext();
    return (
        <div className={`flex-1 items-center flex h-[90vh] ${darkMode && 'bg-gray-800'}`}>
            <div className={`lg:w-full md:block lg:block h-full hidden`}>
                <LeftSidebar />
            </div>
            <div className={`lg:w-full md:w-[400px] sm:w-[85%] h-[500px] mx-auto p-2 overflow-x-hidden scrollbar shadow-lg`}>
                {posts.map((post, index) => (
                    <Post {...post} key={index}/>
                ))}
            </div>
            <div className='w-full h-full hidden lg:block'></div>
        </div>
    )
}

export default HomePage
