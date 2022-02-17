
import "./Class.css"
import React, {useState, useEffect} from 'react';

function ClassGraphQL(props) {
    
    const [classInfo, setClassInfo] = useState({});
    const url = "https://api.peterportal.org/graphql"


    useEffect(() => {
        const fetchData = async () => {
            const query = `
                query {
                    course(id:"${props.name}") {
                        title
                        department_name
                        description
                        instructor_history {
                            name
                        }
                    }
                }
            `

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({query}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            const data = await response.json();
            console.log(data);
            setClassInfo(data.data.course);
        }
        fetchData();
    }, [props.name]);

    let info;
    if(classInfo) {
        info = <div className="information">
            <p id="title">{classInfo.title}</p>
            <p id="department">{classInfo.department_name}</p>
            <p id="description">{classInfo.description}</p>
            {/* ask if array exists, then displays name */}
            {/* BUG: SOME ARRAYS HAVE NULL VALUES (ex COMPSCI122A) */}
            {classInfo.instructor_history?.map((n, index)=>
            (
                <p id="instructor_name" key={index}>{n.name}, </p>
            )
            )}
        </div>
    } else if (classInfo == null) {
        info = <p>Class not found!</p>
    } else {
        info = <p>Loading...</p>
    }
    
    return (
        <div className="class">
            {props.name}
            <div>
                {info}
            </div>
        </div>
    )
}

export default ClassGraphQL;