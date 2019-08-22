import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateMovie(props) {
    let movie = {};
    const [values, setValues] = useState({ id: null, title: '', director: '', metascore: null, stars: [] });
    console.log(props);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                movie = res.data;
                setValues({ id: movie.id, title: movie.title, director: movie.director, metascore: movie.metascore, stars: movie.stars });
                console.log('Res: ', res.data);
            })
            .catch(e => console.log(e));
    }, []);

    const updateValues = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const submit = e => {
        e.preventDefault();
        let update = { ...values, metascore: +values.metascore };
        console.log('Update: ', update);
        axios.put(`http://localhost:5000/api/movies/${values.id}`, update)
            .then(res => {
                props.history.push('/');
                console.log('Success!', res);
            })
            .catch(e => {
                if (e.response.status === 422) props.history.push('/');
                console.log(e, e.response);
            });
    };

    return (
        <div>
            <form name='UpdateMovie'>
                <input name='title' placeholder='Title' value={values.title} onChange={updateValues} />
                <input name='director' placeholder='Director' value={values.director} onChange={updateValues} />
                <input name='metascore' type='number' placeholder='Metascore' value={values.metascore} onChange={updateValues} />
                <button onClick={submit}>Update</button>
            </form>
        </div>
    );
}