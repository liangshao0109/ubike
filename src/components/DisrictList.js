import './StationInfo.css';

function DisrictList({onSelectAllChange, isCheckAll, selectedCounty, districts, onClickCheckbox, isCheck}) {
    return (
        <div className='disrict-list'>
            <label className="disrict">
                <input 
                    id="selectAll"
                    type="checkbox" 
                    name="disrict" 
                    className="selectall"
                    onChange={onSelectAllChange}
                    checked={isCheckAll}/>
                    全部勾選
            </label>

            <div className='checkboxlist' id="checkboxlist">
                {
                    selectedCounty == "1" ?
                    districts.map((district, index) => (
                        <label className="disrict" key={index + 1}>
                            <input 
                                id={index + 1}
                                type="checkbox"
                                name="disrict[]"
                                value={index + 1}
                                onChange={onClickCheckbox}
                                checked={isCheck.includes(index + 1)}
                                />{district}
                        </label>
                    )) :
                    <></>
                }
            </div>    
        </div>
    );
}

export default DisrictList;
