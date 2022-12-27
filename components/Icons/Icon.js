import { useStateContext } from "../../contexts/StateContext"

export function ExploreIcon (){
    const {darkMode} = useStateContext();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g fill="none" fillRule="evenodd"><path d="M-2-2h24v24H-2z"/><path fill={darkMode ? 'white' : '#6b7280'} d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm-5.5-2.5 7.51-3.49L15.5 4.5 7.99 7.99 4.5 15.5ZM10 8.9c.61 0 1.1.49 1.1 1.1 0 .61-.49 1.1-1.1 1.1-.61 0-1.1-.49-1.1-1.1 0-.61.49-1.1 1.1-1.1Z"/></g></svg>
    )
}

export function ActiveExploreIcon () {
    const {darkMode} = useStateContext();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><g fill="none" fillRule="evenodd"><path d="M-2-2h24v24H-2z"/><path fill={darkMode ? 'white' : 'black'}  d="M10 8.9c-.61 0-1.1.49-1.1 1.1 0 .61.49 1.1 1.1 1.1.61 0 1.1-.49 1.1-1.1 0-.61-.49-1.1-1.1-1.1ZM10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm2.19 12.19L4 16l3.81-8.19L16 4l-3.81 8.19Z"/></g></svg>
    )
}