import './StationList.css'

function StationList({stations, selectedCounty}) {
    return (
        <div className="station-list">
            <table className="station-table" cellSpacing="0">
                <tbody>
                    <tr className='table-header'>
                        <th>縣市</th>
                        <th>區域</th>
                        <th>站點名稱</th>
                        <th>可借車輛</th>
                        <th>可還空位</th>
                    </tr>
                    {
                        selectedCounty == "1" ?
                        stations.map(station => {
                            return(
                                <tr className='table-body' key={station.sno}>
                                    <td>台北市</td>
                                    <td>{station.sarea}</td>
                                    <td>{station.sna.replace('YouBike2.0_','')}</td>
                                    <td className='green'>{station.sbi}</td>
                                    <td className='green'>{station.tot}</td>
                                </tr>
                            )
                        }) :
                        <></>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default StationList;
