import React from 'react'
import { useStateContext } from '../contexts/StateContext'
import LeftSidebar from './LeftSidebar'
import Post from './Post'
import PostDetails from './PostDetails'
import ProfilePage from './Profile'
const posts = [
    {
        photoURL: 'https://avatars.githubusercontent.com/u/88154142?v=4',
        userUid: 'user1',
        id: 'user1post',
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
    }
]
const HomePage = () => {
    const {darkMode, initialState, setInitialState} = useStateContext();
    return (
        <div className={`flex-1 items-center flex h-[90vh] ${darkMode && 'bg-gray-800'}`}>
            <div className={`lg:w-full md:block lg:block h-full hidden`}>
                <LeftSidebar />
            </div>
            <div className={`lg:w-full md:w-[400px] sm:w-[85%] h-full mx-auto p-2 overflow-x-hidden scrollbar shadow-lg`}>
                {initialState.HomePage && posts.map((post, index) => (
                    <Post {...post} key={index}/>
                ))}
                {initialState.PostDetails && <PostDetails />}
                {initialState.ProfilePage && <ProfilePage />}
            </div>
            <div className='w-full h-full hidden lg:block'></div>
        </div>
    )
}

export default HomePage
