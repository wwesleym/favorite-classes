import React, {useState} from 'react';
import Class from '../Class/Class';
import ClassGraphQL from '../Class/ClassGraphQL';
import { Helmet } from 'react-helmet'
import "./Home.css"

function Home(props) {

    // variables 
    const [value, setValue] = useState('');
    const [favoriteClasses, setClasses] = useState([]);

    // handle change on text
    const handleChange = (event) => {
        setValue(event.target.value);
    }  

    // submission function
    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (!favoriteClasses.includes(value)) {
            setClasses(favoriteClasses.concat(value))
            setValue('');
        }
        // print out favorite classes
        console.log(favoriteClasses);
    }


    return (
        <div>
            <Helmet>
                <title>wesley's classes</title>
            </Helmet>
            <h1>wesley's favorite classes</h1>
            <form onSubmit={handleSubmit}>
                <label>Add Favorite Class</label>
                <input type="text" value={value} onChange={handleChange}></input>
                <button type="submit">Add Class!</button>
            </form>
            <div className="my-classes">
                {favoriteClasses.map((favClass) => 
                    <Class name={favClass} key={favClass}></Class>
                )}
            </div>
            <div className="my-classes">
                {favoriteClasses.map((favClass) => 
                    <ClassGraphQL name={favClass} key={favClass}></ClassGraphQL>
                )}
            </div>
        </div>
    )
}

export default Home;    // export file so others can use it