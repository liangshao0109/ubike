import './StationInfo.css';
import { useState, useEffect } from 'react';
import banner from '../ubike.png';
import StationList from './StationList';
import Select from 'react-select';
import SearchStation from './SearchStation';
import DisrictList from './DisrictList';

function StationInfo() {
    const countyOptions = [
        { value: '0', label: '選擇縣市' },
        { value: '1', label: '台北市' },
        { value: '2', label: '基隆市' },
        { value: '3', label: '新北市' },
        { value: '4', label: '連江縣' },
        { value: '5', label: '宜蘭縣' },
        { value: '6', label: '新竹市' },
        { value: '7', label: '新竹縣' },
        { value: '8', label: '桃園市' },
        { value: '9', label: '苗栗縣' },
        { value: '10', label: '台中市' },
        { value: '11', label: '彰化縣' },
        { value: '12', label: '南投縣' },
        { value: '13', label: '嘉義市' },
        { value: '14', label: '嘉義縣' },
        { value: '15', label: '雲林縣' },
        { value: '16', label: '台南市' },
        { value: '17', label: '高雄市' },
        { value: '18', label: '澎湖縣' },
        { value: '19', label: '金門縣' },
        { value: '20', label: '屏東縣' },
        { value: '21', label: '台東縣' },
        { value: '22', label: '花蓮縣' },
    ]
    const districts = ['中正區', '大同區', '中山區', '萬華區', '信義區', '松山區', '大安區', '南港區', '北投區', '內湖區', '士林區', '文山區'];

    const [isCheckAll, setIsCheckAll] = useState(true);
    const [isCheck, setIsCheck] = useState(districts.map((elem, index) => index + 1));
    const [stations, setStations] = useState([]);
    const [allStations, setAllStations] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState("1");

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        if (isCheckAll) {
            setIsCheck([]);
        }else{
            setIsCheck(districts.map((elem, index) => index + 1));
        }
    }

    const checkSelectAll = () => {
        setIsCheckAll(true);
        setIsCheck(districts.map((elem, index) => index + 1));
    }

    const handleClick = (e) => {
        const { id, checked } = e.target;
 
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== parseInt(id)));
        }else{
            setIsCheck([...isCheck, parseInt(id)]);
        }
    }

    const fetchStationData = () => {
        fetch("https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json")
          .then(response => {
            return response.json()
          })
          .then(data => {
            // console.log(data);
            setAllStations(data);
          })
    }

    const filterStationsByDisctrictNames = (data) => {
        if(isCheck.length == districts.length){
            setStations(data);
        }else{
            const checkedDisrtictNames = isCheck.map(element => districts[element - 1]);
            setStations(data.filter(item => checkedDisrtictNames.includes(item.sarea)));
        }
    }

    const filterStationsByNames = (name) => {
        setStations(allStations.filter(item => item.sna.includes(name)));
    }

    const handelSelect = (selected) => {
        if(selected){
            setSelectedCounty(selected.value);
            checkSelectAll();
        }else{
            setSelectedCounty("0");
        }
    }

    const handleSearchName = (e) => {
        const name = e.target.value;
        filterStationsByNames(name);
    }

    useEffect(() => {
        fetchStationData();

        const timer = setInterval(
            fetchStationData,
            60000
        );

        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        filterStationsByDisctrictNames(allStations);
        if(isCheck.length == districts.length){
            setIsCheckAll(true);
        }else{
            setIsCheckAll(false);
        }
    }, [isCheck, allStations]);

    return (
        <div className="container">
            <div className="title">
                站點資訊
            </div>
            <div className='content'>
                <div className="search">
                    <Select
                        className="select-list"
                        classNamePrefix="select-list"
                        defaultValue={countyOptions[1]}
                        placeholder="選擇縣市"
                        isClearable="true"
                        isSearchable="true"
                        name="county"
                        options={countyOptions}
                        onChange={handelSelect}
                    />
                    <SearchStation onChange={handleSearchName} />
                    <DisrictList 
                        onSelectAllChange={handleSelectAll}
                        isCheckAll={isCheckAll}
                        selectedCounty={selectedCounty}
                        districts={districts}
                        onClickCheckbox={handleClick}
                        isCheck={isCheck}
                    />
                </div>
                <div className='banner'>
                    <img src={banner} alt="banner"/>
                </div>
            </div>
            <StationList stations={stations} selectedCounty={selectedCounty}/>
        </div>
    );
}

export default StationInfo;
