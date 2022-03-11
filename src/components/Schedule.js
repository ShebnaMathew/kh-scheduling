import { useSelector } from 'react-redux';

const Schedule = () => {

    const schedule = useSelector(state => state.schedule);

    return(
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                {schedule.map((each) => <th scope="col">{each['date']}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">Slides</th>
                {schedule.map((each) => <td>{each['slides']}</td>)}
                </tr>
                <tr>
                <th scope="row">Livestream</th>
                {schedule.map((each) => <td>{each['livestream']}</td>)}
                </tr>
                <tr>
                <th scope="row">Sound</th>
                {schedule.map((each) => <td>{each['sound']}</td>)}
                </tr>
            </tbody>
            </table>
    )
}

export default Schedule;